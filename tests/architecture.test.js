const fs = require('fs');
const path = require('path');

const BANNED_IMPORTS = ['express', 'fastapi', 'flask', 'mongoose', 'sequelize', 'typeorm', 'prisma', 'axios'];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  BANNED_IMPORTS.forEach(pkg => {
    if (content.includes(pkg)) {
      violations.push(pkg);
    }
  });
  return violations;
}

function getDomainFiles() {
  const domainPath = path.join(__dirname, '../packages/domain/src');
  const files = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.js')) {
        files.push(fullPath);
      }
    });
  }
  walk(domainPath);
  return files;
}

const files = getDomainFiles();
let passed = true;

files.forEach(file => {
  const violations = checkFile(file);
  if (violations.length > 0) {
    console.error('FAIL:', file);
    console.error('  Banned imports found:', violations.join(', '));
    passed = false;
  } else {
    console.log('PASS:', file);
  }
});

if (passed) {
  console.log('\nAll architecture tests passed!');
} else {
  console.error('\nArchitecture tests failed!');
  process.exit(1);
}
