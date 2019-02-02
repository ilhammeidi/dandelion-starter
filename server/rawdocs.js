const fs = require('fs');

function rawdoc(componentName) {
  const dir = 'app/';
  const content = fs.readFileSync(dir + componentName.src, 'utf8');
  return content.toString();
}

module.exports = rawdoc;
