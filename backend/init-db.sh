#!/bin/sh
# init-db.sh - Ejecutar migraciones cuando el contenedor inicie

echo "⏳ Esperando 10 segundos a que PostgreSQL esté completamente listo..."
sleep 10

echo "✅ Intentando ejecutar migraciones SQL..."

# Usar node para conectarse - más portable
node << 'EOF'
const pg = require('pg');
const fs = require('fs');
const path = require('path');

const client = new pg.Client({
  host: 'postgres',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionTimeoutMillis: 5000,
  query_timeout: 5000,
});

const migrationDir = '/app/migrations';

(async () => {
  try {
    console.log('Conectando a PostgreSQL...');
    await client.connect();
    console.log('✅ Conectado a PostgreSQL');

    // Leer y ejecutar migraciones
    const files = fs.readdirSync(migrationDir).sort();
    for (const file of files) {
      if (file.endsWith('.sql')) {
        const sqlPath = path.join(migrationDir, file);
        const sql = fs.readFileSync(sqlPath, 'utf8');
        try {
          console.log(`  → Ejecutando: ${file}`);
          await client.query(sql);
          console.log(`  ✅ ${file} completado`);
        } catch (err) {
          console.log(`  ⚠️  ${file} ya procesado o error: ${err.message.substring(0, 50)}`);
        }
      }
    }
    
    console.log('✅ Migraciones completadas');
    await client.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
EOF
