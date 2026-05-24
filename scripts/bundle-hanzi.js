/**
 * Extracts unique Chinese characters from theory/course content
 * and bundles their stroke data into a single JSON file for offline use.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const THEORY_FILE = path.join(ROOT, "assets/data/theory_content.ts");
const COURSE_FILE = path.join(ROOT, "assets/data/course_content.json");
const PRONUNCIATION_FILE = path.join(ROOT, "assets/data/pronunciation_data.ts");
const HANZI_DATA_DIR = path.join(ROOT, "node_modules/hanzi-writer-data");
const OUTPUT_FILE = path.join(ROOT, "assets/data/hanzi_data.json");

// Regex: match any CJK Unified Ideograph (basic range)
const HANZI_REGEX = /[\u4e00-\u9fff]/g;

function extractHanziFromText(text) {
  const matches = text.match(HANZI_REGEX) || [];
  return new Set(matches);
}

function readFile(filepath) {
  try {
    return fs.readFileSync(filepath, "utf-8");
  } catch (e) {
    console.warn("Cannot read", filepath);
    return "";
  }
}

console.log("Scanning content files for Chinese characters...");

const theoryText = readFile(THEORY_FILE);
const courseText = readFile(COURSE_FILE);
const pronunciationText = readFile(PRONUNCIATION_FILE);

const allHanzi = new Set([
  ...extractHanziFromText(theoryText),
  ...extractHanziFromText(courseText),
  ...extractHanziFromText(pronunciationText),
]);

console.log(`Found ${allHanzi.size} unique Chinese characters.`);

// Load each character's stroke data
const hanziData = {};
let missing = 0;
let loaded = 0;

for (const char of allHanzi) {
  const jsonPath = path.join(HANZI_DATA_DIR, `${char}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    hanziData[char] = data;
    loaded++;
  } catch (e) {
    missing++;
    console.warn(`  Missing stroke data for: ${char}`);
  }
}

console.log(`Loaded: ${loaded}, Missing: ${missing}`);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(hanziData), "utf-8");

const sizeMB = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);
console.log(`\nWritten: ${path.relative(ROOT, OUTPUT_FILE)} (${sizeMB} MB)`);
console.log(`Contains stroke data for ${loaded} characters.`);
