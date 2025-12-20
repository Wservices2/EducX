const fetch = require('node-fetch');

async function testAPI() {
  console.log('🧪 Test de connectivité API EducX...\n');

  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test 1: Endpoint racine
    console.log('1️⃣ Test endpoint racine...');
    const rootResponse = await fetch(`${baseUrl}/`);
    const rootData = await rootResponse.json();
    console.log('✅ Endpoint racine:', rootData.message);
    
    // Test 2: Test d'inscription
    console.log('\n2️⃣ Test d\'inscription...');
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@educx.bj',
        password: 'testpassword123'
      }),
    });
    
    const registerData = await registerResponse.json();
    if (registerResponse.ok) {
      console.log('✅ Inscription réussie:', registerData.message);
    } else {
      console.log('⚠️ Inscription (attendu si utilisateur existe):', registerData.message);
    }
    
    // Test 3: Test de connexion
    console.log('\n3️⃣ Test de connexion...');
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@educx.bj',
        password: 'testpassword123'
      }),
    });
    
    const loginData = await loginResponse.json();
    if (loginResponse.ok) {
      console.log('✅ Connexion réussie:', loginData.message);
    } else {
      console.log('⚠️ Connexion (attendu si utilisateur n\'existe pas):', loginData.message);
    }
    
    console.log('\n🎉 Tests terminés !');
    
  } catch (error) {
    console.error('❌ Erreur de test:', error.message);
    console.log('\n💡 Vérifiez que le serveur backend est démarré sur le port 3000');
  }
}

testAPI();
