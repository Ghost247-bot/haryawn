import { hash } from 'bcryptjs';
import crypto from 'crypto';

async function generateSecrets() {
  // Generate a secure JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  
  // Generate a password hash (using 'admin123' as an example password)
  const password = 'admin123';
  const passwordHash = await hash(password, 10);

  console.log('\nGenerated Secrets:');
  console.log('------------------');
  console.log('JWT_SECRET:', jwtSecret);
  console.log('ADMIN_PASSWORD_HASH:', passwordHash);
  console.log('\nPassword for testing:', password);
  console.log('\nCopy these values to your .env file');
}

generateSecrets().catch(console.error); 