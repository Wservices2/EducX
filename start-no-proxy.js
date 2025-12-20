const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage d\'EducX (Sans Proxy)...\n');
console.log('⚠️ IMPORTANT: Communication directe frontend ↔ backend\n');

// Fonction principale
function startServers() {
  console.log('📡 Démarrage du serveur backend sur le port 3000...');
  const backend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'inherit',
    shell: true,
    env: { 
      ...process.env, 
      NODE_ENV: 'development',
      PORT: '3000',
      MONGODB_URI: 'mongodb://localhost:27017/educx'
    }
  });

  // Attendre un peu puis démarrer le frontend
  setTimeout(() => {
    console.log('🎨 Démarrage du client React sur le port 3001...');
    console.log('🔗 Frontend → Backend: http://localhost:3000');
    
    const frontend = spawn('npm', ['start'], {
      cwd: path.join(__dirname, 'client'),
      stdio: 'inherit',
      shell: true,
      env: { 
        ...process.env, 
        PORT: '3001',
        REACT_APP_API_URL: 'http://localhost:3000',
        BROWSER: 'none' // Empêche l'ouverture automatique du navigateur
      }
    });

    // Gérer l'arrêt des processus
    process.on('SIGINT', () => {
      console.log('\n🛑 Arrêt des serveurs...');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });

    frontend.on('error', (err) => {
      console.error('❌ Erreur frontend:', err);
    });

    frontend.on('close', (code) => {
      console.log(`🎨 Frontend fermé avec le code ${code}`);
    });

  }, 3000);

  backend.on('error', (err) => {
    console.error('❌ Erreur backend:', err);
  });

  backend.on('close', (code) => {
    console.log(`📡 Backend fermé avec le code ${code}`);
  });
}

startServers();
