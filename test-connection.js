const net = require('net');

const host = 'db.kwsksemzgwdsyfweyouq.supabase.co';
const port = 5432;

console.log(`Testing connectivity to ${host}:${port}...`);

const socket = new net.Socket();

socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('✅ Connection successful!');
    socket.destroy();
});

socket.on('timeout', () => {
    console.log('❌ Connection timed out');
    socket.destroy();
});

socket.on('error', (err) => {
    console.log(`❌ Connection failed: ${err.message}`);
});

socket.connect(port, host);
