const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Prisma client issues...');

try {
  // Remove existing Prisma client
  console.log('📦 Removing existing Prisma client...');
  const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma');
  if (fs.existsSync(prismaClientPath)) {
    fs.rmSync(prismaClientPath, { recursive: true, force: true });
  }

  // Generate new Prisma client
  console.log('🔄 Generating new Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('✅ Prisma client fixed successfully!');
} catch (error) {
  console.error('❌ Error fixing Prisma client:', error.message);
  process.exit(1);
} 