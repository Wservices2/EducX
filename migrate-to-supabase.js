const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function migrateToSupabase() {
  console.log('🔄 Migration vers Supabase...\n');

  // Connexion à l'ancienne base SQLite
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.OLD_DATABASE_URL || 'file:./dev.db'
      }
    }
  });

  // Connexion à Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Test de connexion à Supabase
    console.log('📡 Test de connexion à Supabase...');
    const { data, error } = await supabase.from('users').select('count');
    if (error) {
      console.log('⚠️ La table users n\'existe pas encore, cela est normal.');
    } else {
      console.log('✅ Connexion à Supabase réussie!');
    }

    // Migration des utilisateurs
    console.log('\n👥 Migration des utilisateurs...');
    const users = await prisma.user.findMany();
    console.log(`Trouvé ${users.length} utilisateurs à migrer`);

    for (const user of users) {
      const { data: supabaseUser, error: userError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          password: user.password,
          role: user.role,
          is_active: user.isActive,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
          last_login: user.lastLogin
        })
        .select();

      if (userError) {
        console.error(`❌ Erreur migration utilisateur ${user.email}:`, userError);
      } else {
        console.log(`✅ Utilisateur migré: ${user.email}`);
      }
    }

    // Migration des profils
    console.log('\n📝 Migration des profils...');
    const profiles = await prisma.profile.findMany({
      include: { user: true }
    });
    console.log(`Trouvé ${profiles.length} profils à migrer`);

    for (const profile of profiles) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          user_id: profile.userId,
          avatar: profile.avatar,
          bio: profile.bio,
          location: profile.location,
          phone: profile.phone,
          website: profile.website
        });

      if (profileError) {
        console.error(`❌ Erreur migration profil ${profile.userId}:`, profileError);
      } else {
        console.log(`✅ Profil migré: ${profile.user.email}`);
      }
    }

    // Migration des cours
    console.log('\n📚 Migration des cours...');
    const courses = await prisma.course.findMany({
      include: { creator: true }
    });
    console.log(`Trouvé ${courses.length} cours à migrer`);

    for (const course of courses) {
      const { error: courseError } = await supabase
        .from('courses')
        .upsert({
          id: course.id,
          title: course.title,
          description: course.description,
          content: course.content,
          thumbnail: course.thumbnail,
          price: course.price,
          level: course.level,
          category: course.category,
          status: course.status,
          duration: course.duration,
          creator_id: course.creatorId,
          created_at: course.createdAt,
          updated_at: course.updatedAt
        });

      if (courseError) {
        console.error(`❌ Erreur migration cours ${course.title}:`, courseError);
      } else {
        console.log(`✅ Cours migré: ${course.title}`);
      }
    }

    // Migration des leçons
    console.log('\n📖 Migration des leçons...');
    const lessons = await prisma.lesson.findMany({
      include: { course: true }
    });
    console.log(`Trouvé ${lessons.length} leçons à migrer`);

    for (const lesson of lessons) {
      const { error: lessonError } = await supabase
        .from('lessons')
        .upsert({
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          video_url: lesson.videoUrl,
          duration: lesson.duration,
          order: lesson.order,
          course_id: lesson.courseId,
          created_at: lesson.createdAt,
          updated_at: lesson.updatedAt
        });

      if (lessonError) {
        console.error(`❌ Erreur migration leçon ${lesson.title}:`, lessonError);
      } else {
        console.log(`✅ Leçon migrée: ${lesson.title} (${lesson.course.title})`);
      }
    }

    // Migration des inscriptions
    console.log('\n📝 Migration des inscriptions...');
    const enrollments = await prisma.courseEnrollment.findMany({
      include: { user: true, course: true }
    });
    console.log(`Trouvé ${enrollments.length} inscriptions à migrer`);

    for (const enrollment of enrollments) {
      const { error: enrollmentError } = await supabase
        .from('course_enrollments')
        .upsert({
          id: enrollment.id,
          user_id: enrollment.userId,
          course_id: enrollment.courseId,
          enrolled_at: enrollment.enrolledAt,
          completed_at: enrollment.completedAt,
          progress: enrollment.progress
        });

      if (enrollmentError) {
        console.error(`❌ Erreur migration inscription ${enrollment.user.email} - ${enrollment.course.title}:`, enrollmentError);
      } else {
        console.log(`✅ Inscription migrée: ${enrollment.user.email} - ${enrollment.course.title}`);
      }
    }

    // Migration des certificats
    console.log('\n🎓 Migration des certificats...');
    const certificates = await prisma.certificate.findMany({
      include: { user: true, course: true }
    });
    console.log(`Trouvé ${certificates.length} certificats à migrer`);

    for (const certificate of certificates) {
      const { error: certificateError } = await supabase
        .from('certificates')
        .upsert({
          id: certificate.id,
          user_id: certificate.userId,
          course_id: certificate.courseId,
          issued_at: certificate.issuedAt,
          certificate_url: certificate.certificateUrl
        });

      if (certificateError) {
        console.error(`❌ Erreur migration certificat ${certificate.user.email} - ${certificate.course.title}:`, certificateError);
      } else {
        console.log(`✅ Certificat migré: ${certificate.user.email} - ${certificate.course.title}`);
      }
    }

    console.log('\n🎉 Migration terminée avec succès!');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  migrateToSupabase();
}

module.exports = { migrateToSupabase };
