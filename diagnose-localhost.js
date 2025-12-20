const fetch = require('node-fetch');

async function diagnoseLocalhost() {
  console.log('🔍 Diagnostic EducX - Localhost...\n');

  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test 1: Vérifier que le serveur répond
    console.log('1️⃣ Test de connectivité serveur...');
    console.log(`   URL testée: ${baseUrl}/`);
    
    const rootResponse = await fetch(`${baseUrl}/`);
    if (rootResponse.ok) {
      const rootData = await rootResponse.json();
      console.log('✅ Serveur actif:', rootData.message);
    } else {
      console.log('❌ Serveur non accessible');
      console.log('📊 Code de statut:', rootResponse.status);
      console.log('💡 Vérifiez que le backend est démarré sur le port 3000');
      return;
    }
    
    // Test 2: Test d'inscription avec des données valides
    console.log('\n2️⃣ Test d\'inscription...');
    const testUser = {
      fullName: 'Test User Localhost',
      email: `test${Date.now()}@localhost.com`,
      password: 'test123'
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
    
    console.log('📊 Code de statut:', registerResponse.status);
    console.log('📋 Headers de réponse:', Object.fromEntries(registerResponse.headers.entries()));
    
    const registerData = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Inscription réussie!');
      console.log('👤 Utilisateur créé:', registerData.user.email);
      console.log('🔑 Token généré:', registerData.token ? 'Oui' : 'Non');
    } else {
      console.log('❌ Erreur d\'inscription:', registerData.message);
      console.log('📊 Code de statut:', registerResponse.status);
      
      // Test 3: Vérifier si l'utilisateur existe déjà
      if (registerData.message && registerData.message.includes('existe déjà')) {
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
    
    console.log('\n🎉 Diagnostic terminé !');
    
  } catch (error) {
    console.error('❌ Erreur de diagnostic:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Démarrez le serveur backend: cd server && npm start');
    console.log('   2. Vérifiez que MongoDB est démarré: mongod');
    console.log('   3. Vérifiez que le port 3000 est libre');
    console.log('   4. Vérifiez les logs du serveur pour les erreurs');
  }
}

diagnoseLocalhost();
