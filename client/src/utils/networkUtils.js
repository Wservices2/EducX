// Utility functions for network detection and analytics

/**
 * Detects the current network connection type
 * @returns {string} Network type (WiFi, 4G, 5G, 3G, 2G, Ethernet, Unknown)
 */
export const detectNetworkType = () => {
  // Check if navigator.connection is available (modern browsers)
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      // Map connection types to more user-friendly names
      const typeMapping = {
        'wifi': 'WiFi',
        'cellular': 'Mobile',
        'ethernet': 'Ethernet',
        'bluetooth': 'Bluetooth',
        'wimax': 'WiMAX',
        'other': 'Other',
        'none': 'No Connection',
        'unknown': 'Unknown'
      };

      const baseType = connection.type || connection.effectiveType || 'unknown';

      // For cellular connections, try to get more specific info
      if (baseType === 'cellular' || connection.effectiveType) {
        const effectiveType = connection.effectiveType;
        if (effectiveType) {
          switch (effectiveType) {
            case 'slow-2g':
            case '2g':
              return '2G';
            case '3g':
              return '3G';
            case '4g':
              return '4G';
            case '5g':
              return '5G';
            default:
              return 'Mobile';
          }
        }
        return 'Mobile';
      }

      return typeMapping[baseType] || 'Unknown';
    }
  }

  // Fallback: Try to detect based on other indicators
  if ('onLine' in navigator && navigator.onLine === false) {
    return 'Offline';
  }

  // Check if it's likely a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    return 'Mobile';
  }

  // Default fallback
  return 'Unknown';
};

/**
 * Gets device and browser information
 * @returns {object} Device and browser info
 */
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;

  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)|Tablet|PlayBook/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  let deviceType = 'Unknown';
  if (isMobile) deviceType = 'Mobile';
  else if (isTablet) deviceType = 'Tablet';
  else if (isDesktop) deviceType = 'Desktop';

  // Detect OS
  let os = 'Unknown';
  if (userAgent.indexOf('Windows NT') !== -1) os = 'Windows';
  else if (userAgent.indexOf('Mac OS X') !== -1) os = 'macOS';
  else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
  else if (userAgent.indexOf('Android') !== -1) os = 'Android';
  else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS';

  // Detect browser
  let browser = 'Unknown';
  if (userAgent.indexOf('Chrome') !== -1) browser = 'Chrome';
  else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
  else if (userAgent.indexOf('Safari') !== -1) browser = 'Safari';
  else if (userAgent.indexOf('Edge') !== -1) browser = 'Edge';
  else if (userAgent.indexOf('Opera') !== -1) browser = 'Opera';

  return {
    deviceType,
    os,
    browser,
    platform,
    language,
    userAgent: userAgent.substring(0, 500) // Limit length
  };
};

/**
 * Gets comprehensive login session data
 * @returns {object} Login session information
 */
export const getLoginSessionData = () => {
  return {
    networkType: detectNetworkType(),
    deviceInfo: JSON.stringify(getDeviceInfo()),
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  };
};