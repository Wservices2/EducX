// Utility functions for loading images dynamically

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

const THEMED_IMAGE_BASENAMES = [
  'african-elearning-1',
  'african-elearning-2',
  'african-elearning-3',
  'african-elearning-4',
  'african-elearning-5',
  'african-elearning-6'
];

const withExtensions = (basePath) =>
  IMAGE_EXTENSIONS.map((ext) => `${basePath}.${ext}`);

/**
 * Loads images from the public/images directory
 * This function tries to load images with common naming patterns
 * @returns {string[]} Array of potential image paths
 */
export const loadSlideshowImages = () => {
  const images = [];

  // Prioritize the e-learning themed gallery
  THEMED_IMAGE_BASENAMES.forEach((name) => {
    images.push(...withExtensions(`/images/${name}`));
  });

  // Backward compatibility with numbered images (1.jpg, 2.jpg, etc.)
  for (let i = 1; i <= 20; i++) {
    images.push(...withExtensions(`/images/${i}`));
  }

  return images;
};

/**
 * Checks if an image exists by attempting to load it
 * @param {string} src - Image source URL
 * @returns {Promise<boolean>} Promise that resolves to true if image loads successfully
 */
export const checkImageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;

    // Timeout after 5 seconds to avoid hanging
    setTimeout(() => resolve(false), 5000);
  });
};

/**
 * Loads and validates slideshow images
 * Uses a more efficient approach to avoid too many concurrent requests
 * @returns {Promise<string[]>} Promise that resolves to array of valid image paths
 */
export const loadValidSlideshowImages = async () => {
  const allImages = loadSlideshowImages();
  const validImages = [];
  const batchSize = 5; // Check 5 images at a time

  // Process images in batches to avoid overwhelming the browser
  for (let i = 0; i < allImages.length; i += batchSize) {
    const batch = allImages.slice(i, i + batchSize);
    const batchChecks = batch.map(src => checkImageExists(src));
    const batchResults = await Promise.all(batchChecks);

    batchResults.forEach((exists, index) => {
      if (exists) {
        validImages.push(batch[index]);
      }
    });

    // Small delay between batches
    if (i + batchSize < allImages.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Return valid images or fallback images if none found
  if (validImages.length > 0) {
    console.log(`Loaded ${validImages.length} slideshow images:`, validImages);
    return validImages;
  }

  // Fallback images if no local images are found
  console.log('No local images found, using fallback images');
  return [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/814124/pexels-photo-814124.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2'
  ];
};
