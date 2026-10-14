import fs from 'node:fs';

try {
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  console.log('✓ Successfully created dist/404.html for GitHub Pages SPA routing');
} catch (err) {
  console.error('Error copying index.html to 404.html:', err);
  process.exit(1);
}
