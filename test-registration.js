const fetch = require('node-fetch');

async function testRegistration() {
  console.log('🧪 Test de création de compte EducX...\n');

  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test 1: Vérifier que le serveur répond
    console.log('1️⃣ Test de connectivité serveur...');
    const rootResponse = await fetch(`${baseUrl}/`);
    if (rootResponse.ok) {
      const rootData = await rootResponse.json();
      console.log('✅ Serveur actif:', rootData.message);
    } else {
      console.log('❌ Serveur non accessible');
      return;
    }
    
    // Test 2: Test d'inscription avec des données valides
    console.log('\n2️⃣ Test d\'inscription...');
    const testUser = {
      fullName: 'Test User EducX',
      email: `test${Date.now()}@educx.bj`,
      password: 'testpassword123'
    };
    
    console.log('📝 Données d\'inscription:', {
      fullName: testUser.fullName,
      email: testUser.email,
      password: '***'
    });
    
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    
    const registerData = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Inscription réussie!');
      console.log('👤 Utilisateur créé:', registerData.user.email);
      console.log('🔑 Token généré:', registerData.token ? 'Oui' : 'Non');
    } else {
      console.log('❌ Erreur d\'inscription:', registerData.message);
      console.log('📊 Code de statut:', registerResponse.status);
      
      // Test 3: Vérifier si l'utilisateur existe déjà
      if (registerData.message.includes('existe déjà')) {
        console.log('\n3️⃣ Test de connexion avec utilisateur existant...');
        const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: testUser.email,
            password: testUser.password
          }),
        });
        
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          console.log('✅ Connexion réussie avec utilisateur existant');
        } else {
          console.log('❌ Erreur de connexion:', loginData.message);
        }
      }
    }
    
    console.log('\n🎉 Tests terminés !');
    
  } catch (error) {
    console.error('❌ Erreur de test:', error.message);
    console.log('\n💡 Vérifications à faire:');
    console.log('   1. Le serveur backend est-il démarré sur le port 3000?');
    console.log('   2. MongoDB est-il installé et démarré?');
    console.log('   3. Y a-t-il des erreurs dans la console du serveur?');
  }
}

testRegistration();
