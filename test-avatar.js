// Test pour l'upload de photo de profil
const http = require('http');
const fs = require('fs');
const path = require('path');

function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: headers
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = body ? JSON.parse(body) : {};
          resolve({
            status: res.statusCode,
            data: jsonBody
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

async function testAvatarUpload() {
  console.log('🧪 Test de l\'upload de photo de profil...\n');

  try {
    // 1. Se connecter
    console.log('1️⃣ Connexion...');
    const loginResponse = await makeRequest('/api/auth/login', 'POST', JSON.stringify({
      email: 'dashboard@test.com',
      password: 'password123'
    }), {
      'Content-Type': 'application/json'
    });

    if (loginResponse.status === 200 && loginResponse.data.success) {
      const token = loginResponse.data.data.token;
      console.log('✅ Connexion réussie');

      // 2. Vérifier le profil actuel
      console.log('\n2️⃣ Vérification du profil actuel...');
      const profileResponse = await makeRequest('/api/auth/profile', 'GET', null, {
        'Authorization': `Bearer ${token}`
      });
      
      console.log('Profil actuel:', profileResponse.data);

      // 3. Créer une petite image de test (1x1 pixel PNG)
      console.log('\n3️⃣ Création d\'une image de test...');
      const pngImageData = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
        0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 pixel
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // bit depth, color type
        0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
        0x54, 0x08, 0x99, 0x01, 0x01, 0x01, 0x00, 0x00,
        0xFE, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // CRC
        0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND chunk
        0xAE, 0x42, 0x60, 0x82
      ]);

      // Créer le FormData manuellement
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substr(2, 16);
      let formData = '';

      formData += `--${boundary}\r\n`;
      formData += 'Content-Disposition: form-data; name="avatar"; filename="test.png"\r\n';
      formData += 'Content-Type: image/png\r\n\r\n';
      
      const formDataStart = Buffer.from(formData, 'utf8');
      const formDataEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');

      const totalLength = formDataStart.length + pngImageData.length + formDataEnd.length;
      const fullFormData = Buffer.concat([formDataStart, pngImageData, formDataEnd]);

      // 4. Uploader l'image
      console.log('\n4️⃣ Upload de l\'image...');
      const uploadResponse = await makeRequest('/api/auth/avatar', 'POST', fullFormData, {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': totalLength.toString()
      });

      console.log('Réponse upload:', uploadResponse.status, uploadResponse.data);

      if (uploadResponse.status === 200) {
        console.log('✅ Upload réussi!');
        console.log(`📸 URL de l'avatar: http://localhost:5000${uploadResponse.data.avatarUrl}`);
        
        // 5. Vérifier que le fichier existe
        const avatarPath = path.join(__dirname, 'uploads', 'avatars', path.basename(uploadResponse.data.avatarUrl));
        if (fs.existsSync(avatarPath)) {
          console.log('✅ Fichier avatar créé sur le serveur');
        } else {
          console.log('❌ Fichier avatar non trouvé sur le serveur');
        }
      } else {
        console.log('❌ Échec de l\'upload');
      }

      console.log('\n🌐 Test terminé! Vous pouvez maintenant:');
      console.log('   1. Vous connecter sur http://localhost:5000');
      console.log('   2. Aller dans votre profil');
      console.log('   3. Cliquer sur "Changer la photo de profil"');
      console.log('   4. Sélectionner une image');

    } else {
      console.log('❌ Échec de la connexion:', loginResponse.data);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testAvatarUpload();
