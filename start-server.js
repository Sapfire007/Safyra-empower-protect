import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting Safyra backend server...');

const serverProcess = spawn('node', [path.join(__dirname, 'backend', 'src', 'server.js')], {
  stdio: 'inherit'
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  serverProcess.kill();
  process.exit();
});