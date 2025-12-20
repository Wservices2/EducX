const http = require('http');

function testServer() {
  console.log('🔍 Test de connectivité serveur...\n');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`✅ Serveur répond avec le code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('📊 Réponse:', jsonData);
      } catch (e) {
        console.log('📊 Réponse (texte):', data);
      }
      
      // Test d'inscription
      testRegistration();
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n💡 Solutions:');
    console.log('   1. Démarrez le serveur backend: cd server && npm start');
    console.log('   2. Vérifiez que le port 3000 est libre');
    console.log('   3. Vérifiez que MongoDB est démarré');
  });

  req.end();
}

function testRegistration() {
  console.log('\n🧪 Test d\'inscription...');
  
  const postData = JSON.stringify({
    fullName: 'Test User',
    email: `test${Date.now()}@localhost.com`,
    password: 'test123'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`📊 Code de statut: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Inscription réussie!');
          console.log('👤 Utilisateur:', jsonData.user.email);
        } else {
          console.log('❌ Erreur d\'inscription:', jsonData.message);
        }
      } catch (e) {
        console.log('📊 Réponse (texte):', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erreur de requête:', error.message);
  });

  req.write(postData);
  req.end();
}

testServer();
