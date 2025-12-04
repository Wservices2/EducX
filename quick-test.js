const fetch = require('node-fetch');

async function quickTest() {
  console.log('🚀 Test rapide EducX...\n');

  try {
    // Test 1: Serveur actif
    console.log('1️⃣ Test serveur...');
    const response = await fetch('http://localhost:3000/');
    if (response.ok) {
      console.log('✅ Serveur actif');
    } else {
      console.log('❌ Serveur non accessible');
      return;
    }

    // Test 2: Inscription
    console.log('\n2️⃣ Test inscription...');
    const testData = {
      fullName: 'Test User',
      email: `test${Date.now()}@educx.bj`,
      password: 'test123'
    };

    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Inscription réussie!');
      console.log('👤 Email:', result.user.email);
    } else {
      console.log('❌ Erreur inscription:', result.message);
      console.log('📊 Status:', registerResponse.status);
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

quickTest();
