// Script simple pour créer un utilisateur de test et tester le dashboard
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

async function testDashboard() {
  console.log('🧪 Test du dashboard avec données réelles...\n');

  try {
    // 1. Se connecter avec l'utilisateur de test existant
    console.log('1️⃣ Connexion avec l\'utilisateur de test...');
    const loginResponse = await makeRequest('/api/auth/login', 'POST', {
      email: 'dashboard@test.com',
      password: 'password123'
    });

    if (loginResponse.status === 200 && loginResponse.data.success) {
      console.log('✅ Connexion réussie');
      const token = loginResponse.data.data.token;
      const user = loginResponse.data.data.user;
      console.log(`👤 Email: ${user.email}, ID: ${user.id}`);
      console.log(`🔑 Token: ${token.substring(0, 30)}...\n`);

      // 2. Tester les endpoints du dashboard
      console.log('2️⃣ Test des endpoints du dashboard...');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Test stats
      const statsResponse = await makeRequest('/api/dashboard/stats', 'GET', null, headers);
      console.log(`📊 Stats: ${statsResponse.status} -`, statsResponse.data);

      // Test activity
      const activityResponse = await makeRequest('/api/dashboard/recent-activity', 'GET', null, headers);
      console.log(`📋 Activity: ${activityResponse.status} -`, activityResponse.data);

      // Test progress
      const progressResponse = await makeRequest('/api/dashboard/progress', 'GET', null, headers);
      console.log(`📈 Progress: ${progressResponse.status} -`, progressResponse.data);

      console.log('\n✅ Test terminé avec succès!');
      console.log('\n🌐 Vous pouvez maintenant vous connecter avec:');
      console.log(`   Email: dashboard@test.com`);
      console.log(`   Mot de passe: password123`);
      console.log(`   URL: http://localhost:5000`);

    } else {
      console.log('❌ Échec de la connexion:', loginResponse.data);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testDashboard();
