const axios = require('axios');

async function testDashboardEndpoints() {
  const baseURL = 'http://localhost:5000';
  
  try {
    console.log('🧪 Test des endpoints du dashboard...');
    
    // 1. Créer un utilisateur de test
    console.log('\n1️⃣ Création d\'un utilisateur de test...');
    const registerResponse = await axios.post(`${baseURL}/api/auth/register`, {
      fullName: 'Utilisateur Test',
      email: 'test@example.com',
      password: 'password123'
    });
    
    if (registerResponse.data.success) {
      console.log('✅ Utilisateur créé avec succès');
      const token = registerResponse.data.data.token;
      const user = registerResponse.data.data.user;
      console.log(`👤 Email: ${user.email}, ID: ${user.id}`);
      
      // 2. Tester les endpoints du dashboard
      console.log('\n2️⃣ Test des endpoints du dashboard...');
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      // Test stats
      try {
        const statsResponse = await axios.get(`${baseURL}/api/dashboard/stats`, { headers });
        console.log('✅ /api/dashboard/stats - OK');
        console.log('📊 Stats:', statsResponse.data);
      } catch (error) {
        console.log('❌ /api/dashboard/stats - Erreur:', error.response?.status, error.response?.data);
      }
      
      // Test recent activity
      try {
        const activityResponse = await axios.get(`${baseURL}/api/dashboard/recent-activity`, { headers });
        console.log('✅ /api/dashboard/recent-activity - OK');
        console.log('📋 Activity:', activityResponse.data);
      } catch (error) {
        console.log('❌ /api/dashboard/recent-activity - Erreur:', error.response?.status, error.response?.data);
      }
      
      // Test progress
      try {
        const progressResponse = await axios.get(`${baseURL}/api/dashboard/progress`, { headers });
        console.log('✅ /api/dashboard/progress - OK');
        console.log('📈 Progress:', progressResponse.data);
      } catch (error) {
        console.log('❌ /api/dashboard/progress - Erreur:', error.response?.status, error.response?.data);
      }
      
    } else {
      console.log('❌ Échec de la création de l\'utilisateur');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.response?.data || error.message);
  }
}

testDashboardEndpoints();
