#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/images/hero-portrait.png');
const outputDir = path.join(__dirname, '../public/images');

const widths = [400, 800, 1200, 1600, 1920];
const quality = 85;

async function generateOptimizedImages() {
  console.log('🖼️  Generating optimized hero portrait images...');
  
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate WebP versions
    console.log('📦 Generating WebP versions...');
    for (const width of widths) {
      const outputPath = path.join(outputDir, `hero-portrait-${width}w.webp`);
      
      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality })
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${path.basename(outputPath)}`);
    }

    // Generate JPG fallback versions
    console.log('📦 Generating JPG fallback versions...');
    for (const width of widths) {
      const outputPath = path.join(outputDir, `hero-portrait-${width}w.jpg`);
      
      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality, progressive: true })
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${path.basename(outputPath)}`);
    }

    // Generate mobile-optimized version (square crop for better mobile visibility)
    console.log('📱 Generating mobile-optimized version...');
    const mobilePath = path.join(outputDir, 'hero-portrait-mobile.webp');
    
    await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 90 })
      .toFile(mobilePath);
    
    console.log(`✅ Generated: ${path.basename(mobilePath)}`);

    console.log('🎉 All optimized images generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating images:', error);
    process.exit(1);
  }
}

generateOptimizedImages();
