const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace double quoted URLs
      content = content.replace(/"http:\/\/localhost:4000/g, 'process.env.REACT_APP_API_URL + "');
      
      // Replace single quoted URLs
      content = content.replace(/'http:\/\/localhost:4000/g, "process.env.REACT_APP_API_URL + '");
      
      // Replace template literals
      content = content.replace(/`http:\/\/localhost:4000/g, '`${process.env.REACT_APP_API_URL}');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

const frontendSrc = path.join(__dirname, '..', 'employee-managenet-system-mern-college-project-main', 'frontend', 'src');
console.log('Starting refactor in', frontendSrc);
processDir(frontendSrc);
console.log('Done!');
