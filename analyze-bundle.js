#!/usr/bin/env node

// Bundle analysis script for performance optimization
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Analyzing bundle size and performance...\n');

// Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Analyze dist folder
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log('📊 Bundle Analysis:');
  console.log('==================');
  
  const files = fs.readdirSync(distPath, { recursive: true });
  let totalSize = 0;
  
  files.forEach(file => {
    if (typeof file === 'string') {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalSize += stats.size;
        
        if (file.endsWith('.js')) {
          console.log(`📄 ${file}: ${sizeKB} KB`);
        } else if (file.endsWith('.css')) {
          console.log(`🎨 ${file}: ${sizeKB} KB`);
        } else if (file.endsWith('.html')) {
          console.log(`🌐 ${file}: ${sizeKB} KB`);
        } else {
          console.log(`📁 ${file}: ${sizeKB} KB`);
        }
      }
    }
  });
  
  console.log('\n📈 Total Bundle Size:', (totalSize / 1024).toFixed(2), 'KB');
  console.log('📈 Total Bundle Size:', (totalSize / (1024 * 1024)).toFixed(2), 'MB');
  
  // Performance recommendations
  console.log('\n🚀 Performance Recommendations:');
  console.log('================================');
  
  if (totalSize > 1024 * 1024) { // > 1MB
    console.log('⚠️  Bundle size is large (>1MB). Consider:');
    console.log('   - Code splitting');
    console.log('   - Tree shaking');
    console.log('   - Lazy loading');
  } else {
    console.log('✅ Bundle size is good (<1MB)');
  }
  
  // Check for large JS files
  const jsFiles = files.filter(file => typeof file === 'string' && file.endsWith('.js'));
  const largeJsFiles = jsFiles.filter(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    return stats.size > 200 * 1024; // > 200KB
  });
  
  if (largeJsFiles.length > 0) {
    console.log('⚠️  Large JS files detected:');
    largeJsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`   - ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    });
    console.log('   Consider splitting these files further');
  }
  
  console.log('\n✅ Bundle analysis completed!');
} else {
  console.log('❌ Dist folder not found. Build may have failed.');
}
