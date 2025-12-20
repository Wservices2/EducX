const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    if (!envContent.includes('DATABASE_URL=')) {
        console.error('❌ DATABASE_URL not found in .env');
        return;
    }

    const lines = envContent.split('\n');
    let newUrl = '';
    const newLines = lines.map(line => {
        if (line.startsWith('DATABASE_URL=')) {
            const parts = line.split('=');
            let url = parts.slice(1).join('=');
            // Remove quotes if present
            url = url.replace(/^["']|["']$/g, ''); // Basic quote removal

            if (url.includes('mongodb.net/') && !url.includes('mongodb.net/educx') && !url.split('mongodb.net/')[1].startsWith('?')) {
                // It has a path but maybe not educx? check if it's just /
            }

            // Check for missing DB name
            // Pattern: mongodb.net/? or mongodb.net?
            if (url.includes('mongodb.net/?')) {
                url = url.replace('mongodb.net/?', 'mongodb.net/educx?');
            } else if (url.endsWith('mongodb.net/')) {
                url = url + 'educx';
            } else if (url.endsWith('mongodb.net')) {
                url = url + '/educx';
            } else {
                // Double check if there is a path
                const afterNet = url.split('mongodb.net/')[1];
                if (afterNet && afterNet.startsWith('?')) {
                    // Case where split worked but it started with ?
                    url = url.replace('mongodb.net/', 'mongodb.net/educx');
                } else if (!url.includes('mongodb.net/')) {
                    // Maybe different format?
                }
            }

            newUrl = url;
            return `DATABASE_URL="${url}"`;
        }
        return line;
    });

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log('✅ Local .env file updated successfully!');
    console.log('\n👇 COPY THIS VALUE TO VERCEL ENVIRONMENT VARIABLES:');
    console.log(newUrl);
    console.log('\n(Settings -> Environment Variables -> Edit DATABASE_URL)');

} catch (error) {
    console.error('Error fixing .env:', error);
}
