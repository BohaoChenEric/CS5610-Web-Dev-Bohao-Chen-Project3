const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const directories = [
  './', 
  './frontend',
  './backend'
];

const cleanup = () => {
  directories.forEach(dir => {
    // Remove node_modules
    const nodeModulesPath = path.join(__dirname, dir, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`Removing ${nodeModulesPath}...`);
      execSync(`rmdir /s /q "${nodeModulesPath}"`);
    }

    // Remove package-lock.json
    const packageLockPath = path.join(__dirname, dir, 'package-lock.json');
    if (fs.existsSync(packageLockPath)) {
      console.log(`Removing ${packageLockPath}...`);
      fs.unlinkSync(packageLockPath);
    }
  });
  
  console.log('Cleanup completed!');
};

cleanup();