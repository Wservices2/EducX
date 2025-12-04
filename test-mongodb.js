const { MongoClient } = require('mongodb');

async function testMongoDB() {
  console.log('🔍 Test de connexion MongoDB...\n');

  const mongoURI = 'mongodb://localhost:27017/educx';
  
  try {
    console.log('📡 Connexion à MongoDB...');
    console.log('🔗 URI:', mongoURI);
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    console.log('✅ Connexion MongoDB réussie!');
    
    // Test de ping
    await client.db('admin').admin().ping();
    console.log('✅ Ping MongoDB réussi!');
    
    // Vérifier la base de données
    const db = client.db('educx');
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections existantes:', collections.map(c => c.name));
    
    // Vérifier la collection users
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log('👥 Nombre d\'utilisateurs:', userCount);
    
    // Lister quelques utilisateurs
    if (userCount > 0) {
      const users = await usersCollection.find({}).limit(3).toArray();
      console.log('👤 Exemples d\'utilisateurs:');
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.firstName} ${user.lastName})`);
      });
    }
    
    await client.close();
    console.log('\n✅ Test MongoDB terminé avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Installez MongoDB: https://www.mongodb.com/try/download/community');
    console.log('   2. Démarrez MongoDB: mongod');
    console.log('   3. Vérifiez que le port 27017 est libre');
    console.log('   4. Vérifiez les permissions de MongoDB');
  }
}

testMongoDB();
