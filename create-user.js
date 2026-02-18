// Créer un nouvel utilisateur de test après le nettoyage de la DB
const http = require('http');

function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
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
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function createNewUser() {
  console.log('🧹 Création d\'un nouvel utilisateur après nettoyage de la DB...\n');

  try {
    // 1. Créer le nouvel utilisateur
    console.log('1️⃣ Création du nouvel utilisateur...');
    const registerResponse = await makeRequest('/api/auth/register', 'POST', {
      fullName: 'Test User',
      email: 'test@educx.com',
      password: 'password123'
    });

    if (registerResponse.status === 201 && registerResponse.data.success) {
      console.log('✅ Utilisateur créé avec succès');
      
      // 2. Se connecter
      console.log('\n2️⃣ Connexion...');
      const loginResponse = await makeRequest('/api/auth/login', 'POST', {
        email: 'test@educx.com',
        password: 'password123'
      });

      if (loginResponse.status === 200 && loginResponse.data.success) {
        console.log('✅ Connexion réussie');
        const token = loginResponse.data.data.token;
        const user = loginResponse.data.data.user;
        console.log(`👤 Email: ${user.email}, ID: ${user.id}`);
        
        // 3. Tester les endpoints
        console.log('\n3️⃣ Test des endpoints...');
        const headers = { 'Authorization': `Bearer ${token}` };

        const statsResponse = await makeRequest('/api/dashboard/stats', 'GET', null, headers);
        console.log(`📊 Stats: ${statsResponse.status} -`, statsResponse.data);

        const activityResponse = await makeRequest('/api/dashboard/recent-activity', 'GET', null, headers);
        console.log(`📋 Activity: ${activityResponse.status} -`, activityResponse.data);

        const progressResponse = await makeRequest('/api/dashboard/progress', 'GET', null, headers);
        console.log(`📈 Progress: ${progressResponse.status} -`, progressResponse.data);

        console.log('\n✅ Nouvel utilisateur créé et testé avec succès!');
        console.log('\n🌐 Identifiants pour le site web:');
        console.log(`   Email: test@educx.com`);
        console.log(`   Mot de passe: password123`);
        console.log(`   URL: http://localhost:5000`);
        console.log('\n🧹 La base de données est maintenant propre!');

      } else {
        console.log('❌ Échec de la connexion:', loginResponse.data);
      }

    } else {
      console.log('❌ Échec de la création:', registerResponse.data);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createNewUser();
