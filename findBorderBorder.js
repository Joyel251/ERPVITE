import fs from 'fs'
import path from 'path'
const fs = require('fs');
const path = require('path');

const targetClass = 'border-border';
const projectDir = './src';

function searchDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(targetClass)) {
        console.log(`🔍 Found '${targetClass}' in: ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes(targetClass)) {
            console.log(`   Line ${idx + 1}: ${line.trim()}`);
          }
        });
        console.log('---');
      }
    }
  });
}

console.log(`Searching for '${targetClass}' in ${projectDir}...`);
searchDir(projectDir);
