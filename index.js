import { spawn } from 'child_process';
import { promisify } from 'util';

const wait = promisify(setTimeout);

async function startAndMonitorServer() {
  try {
    // Start the server with pnpm start
    const server = spawn('pnpm', ['start'], {
      stdio: 'pipe',
      shell: true
    });

    // Promise that resolves when server starts or rejects after timeout
    const serverStartPromise = new Promise((resolve, reject) => {
      let output = '';

      server.stdout.on('data', (data) => {
        output += data.toString();
        // Add your specific server start indicator here
        if (output.includes('Server started') || output.includes('listening')) {
          resolve('Server started successfully');
        }
      });

      server.stderr.on('data', (data) => {
        console.error(`Server error: ${data}`);
      });

      server.on('error', (error) => {
        reject(`Failed to start server: ${error}`);
      });
    });

    // Race between server start and timeout
    const result = await Promise.race([
      serverStartPromise,
      wait(5000).then(() => Promise.reject('Server startup timed out'))
    ]);

    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    console.log('Attempting to restart server...');
    // Retry starting the server with monitoring
    await startAndMonitorServer();
    return true;
  }
}

export default startAndMonitorServer;
// Main execution
if (require.main === module) {
  startAndMonitorServer()
    .then(server => {
      process.on('SIGINT', () => {
        console.log('Shutting down server...');
        process.exit(0);
      });
    })
    .catch(error => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
}