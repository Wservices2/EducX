require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection() {
  console.log('🔍 Test de connexion MongoDB via Prisma...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ Erreur: La variable DATABASE_URL n\'est pas définie dans le fichier .env');
    return;
  }

  // Masquer le mot de passe pour l'affichage
  let connectionURI = process.env.DATABASE_URL;
  if (!connectionURI.includes('.net/') && !connectionURI.includes('.net/educx')) {
    // This check is a bit naive but serves the purpose
  }

  // Fix missing database name if detected
  if (connectionURI.includes('.net/?')) {
    console.log('⚠️ URI détectée sans nom de base de données. Tentative de correction automatique...');
    connectionURI = connectionURI.replace('.net/?', '.net/educx?');
  } else if (connectionURI.endsWith('.net/')) {
    connectionURI = connectionURI + 'educx';
  }

  const maskedURI = connectionURI.replace(/:([^:@]+)@/, ':****@');
  console.log('🔗 URI:', maskedURI);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: connectionURI
      }
    },
    log: ['error', 'warn'],
  });

  try {
    console.log('📡 Tentative de connexion...');
    await prisma.$connect();
    console.log('✅ Connexion Prisma réussie!');

    // Tenter une requête simple
    console.log('📚 Vérification des données...');
    const userCount = await prisma.user.count();
    console.log(`👥 Nombre d'utilisateurs: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        take: 3,
        select: { email: true, firstName: true, lastName: true }
      });
      console.log('👤 Exemples d\'utilisateurs:');
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.firstName} ${user.lastName})`);
      });
    }

    await prisma.$disconnect();
    console.log('\n✅ Test terminé avec succès!');

  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    if (error.message.includes('Server selection timeout') || error.message.includes('ReplicaSetNoPrimary') || error.message.includes('InternalError')) {
      console.log('\n💡 DIAGNOSTIC: Le serveur MongoDB est inaccessible.');
      console.log('   Causes probables:');
      console.log('   1. Whitelist IP: Vos adresses IP (Vercel ou locale) ne sont pas autorisées sur Atlas.');
      console.log('      -> Ajoutez 0.0.0.0/0 dans Network Access sur Atlas pour Vercel.');
      console.log('   2. Problème de réseau ou de firewall.');
    }

    // Cleanup even on error
    try {
      await prisma.$disconnect();
    } catch (e) { }
  }
}

testPrismaConnection();
