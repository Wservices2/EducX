const { PrismaClient } = require('@prisma/client');

async function testStringEnums() {
  console.log('🧪 Test des strings au lieu des enums...\n');

  const prisma = new PrismaClient();

  try {
    // Test de connexion
    console.log('1️⃣ Test de connexion à SQLite...');
    await prisma.$connect();
    console.log('✅ Connexion à SQLite réussie');

    // Test de création d'utilisateur avec string role
    console.log('\n2️⃣ Test de création d\'utilisateur avec role string...');
    const testUser = await prisma.user.create({
      data: {
        firstName: 'Test',
        lastName: 'String',
        email: `test${Date.now()}@string.com`,
        password: 'test123',
        role: 'STUDENT' // String au lieu d'enum
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });
    console.log('✅ Utilisateur créé avec role string:', testUser.role);

    // Test de création de cours avec strings
    console.log('\n3️⃣ Test de création de cours avec strings...');
    const testCourse = await prisma.course.create({
      data: {
        title: 'Cours de Test String',
        description: 'Un cours de test avec des strings',
        content: 'Contenu du cours de test',
        price: 0,
        level: 'BEGINNER', // String au lieu d'enum
        category: 'test',
        status: 'PUBLISHED', // String au lieu d'enum
        duration: 60,
        creatorId: testUser.id
      },
      select: {
        id: true,
        title: true,
        level: true,
        status: true
      }
    });
    console.log('✅ Cours créé avec strings:', {
      title: testCourse.title,
      level: testCourse.level,
      status: testCourse.status
    });

    // Test de lecture avec filtres sur les strings
    console.log('\n4️⃣ Test de filtrage par strings...');
    const publishedCourses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED'
      },
      select: {
        title: true,
        status: true
      }
    });
    console.log(`✅ ${publishedCourses.length} cours publié(s) trouvé(s)`);

    const studentUsers = await prisma.user.findMany({
      where: {
        role: 'STUDENT'
      },
      select: {
        firstName: true,
        lastName: true,
        role: true
      }
    });
    console.log(`✅ ${studentUsers.length} étudiant(s) trouvé(s)`);

    console.log('\n🎉 Tous les tests de strings ont réussi !');
    console.log('\n💡 Avantages des strings au lieu des enums:');
    console.log('   ✅ Compatible avec SQLite');
    console.log('   ✅ Plus flexible pour les modifications');
    console.log('   ✅ Pas de problème de migration');
    console.log('   ✅ Valeurs: "STUDENT", "INSTRUCTOR", "ADMIN"');
    console.log('   ✅ Valeurs: "BEGINNER", "INTERMEDIATE", "ADVANCED"');
    console.log('   ✅ Valeurs: "DRAFT", "PUBLISHED", "ARCHIVED"');

  } catch (error) {
    console.error('❌ Erreur de test strings:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Vérifiez que le schema Prisma est correct');
    console.log('   2. Générez le client: npx prisma generate');
    console.log('   3. Créez la base de données: npx prisma migrate dev --name init');
    console.log('   4. Relancez ce test');
  } finally {
    await prisma.$disconnect();
  }
}

testStringEnums();
