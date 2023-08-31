import fs from 'fs';
import opentype from 'opentype.js';
import chalk from 'chalk';
import { ogData } from '../src/config/og.mjs';

console.log(`Script Start - ${chalk.green('reduceFont')}`);
const fontPath = './assets/SmileySans-Oblique.ttf';
console.log(`Loading font file - ${fontPath}`);
const font = opentype.loadSync(fontPath);
const glyphs = font.glyphs.glyphs;

const ogDataText = ogData.bio + ogData.name;
const ogDataChar = Array.from(new Set(ogDataText.split('')));
const ogDataUnicode = ogDataChar.map((item) => item.charCodeAt(0));
const newGlyphs = [];

console.log('Filtering glyphs...');
for (const key in glyphs) {
  if (ogDataUnicode.includes(glyphs[key].unicode)) {
    newGlyphs.push(glyphs[key]);
  }
}

const newFont = new opentype.Font({
  familyName: 'OpenTypeSans',
  styleName: 'Regular',
  unitsPerEm: font.unitsPerEm,
  ascender: font.ascender,
  descender: font.descender,
  glyphs: newGlyphs,
});

const outputPath = './public/SmileySans-Oblique.ttf';
if (fs.existsSync(outputPath)) {
  console.log('Removing old font file...');
  fs.rmSync(outputPath);
}

console.log(`Writing new font file - ${outputPath}`);
newFont.download(outputPath);
console.log(chalk.green('Reduce font success!'));
