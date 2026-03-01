import potrace from 'potrace';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../public/quang-minh-logo.png');
const outputPath = join(__dirname, '../public/quang-minh-logo.svg');

console.log('🎨 Converting PNG to SVG...');
console.log('Input:', inputPath);
console.log('Output:', outputPath);

// Trace the image
potrace.trace(inputPath, {
  color: 'auto',
  background: 'transparent',
  threshold: 128,
  optTolerance: 0.2,
  turdSize: 2,
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
}, (err, svg) => {
  if (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
  
  // Write SVG file
  writeFileSync(outputPath, svg);
  console.log('✅ SVG created successfully!');
  console.log('📁 Saved to:', outputPath);
});
