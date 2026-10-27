#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const MAX_NON_BLANK_LINES = 200;

const TARGET_DIRECTORIES = ['src', 'test', 'packages', 'e2e'];
const EXTENSIONS = new Set(['.ts', '.tsx']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', 'coverage', '.git', 'storybook-static']);

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        getFiles(fullPath, fileList);
      }
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function countNonBlankLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let nonBlank = 0;
  for (const line of lines) {
    if (line.trim().length > 0) {
      nonBlank++;
    }
  }
  return nonBlank;
}

function main() {
  const violations = [];
  const allFiles = [];

  for (const targetDir of TARGET_DIRECTORIES) {
    const files = getFiles(path.resolve(process.cwd(), targetDir));
    allFiles.push(...files);
  }

  // De-duplicate in case of overlaps
  const uniqueFiles = Array.from(new Set(allFiles));

  for (const file of uniqueFiles) {
    const count = countNonBlankLines(file);
    if (count > MAX_NON_BLANK_LINES) {
      const relPath = path.relative(process.cwd(), file);
      violations.push({ file: relPath, count });
    }
  }

  if (violations.length > 0) {
    console.error(
      `\n❌ Error: ${violations.length} file(s) exceed maximum allowed ${MAX_NON_BLANK_LINES} non-blank lines:`
    );
    violations.sort((a, b) => b.count - a.count);
    for (const v of violations) {
      console.error(`  - ${v.file}: ${v.count} non-blank lines (max: ${MAX_NON_BLANK_LINES})`);
    }
    console.error('\nPlease refactor or split these files into modular components/submodules.\n');
    process.exit(1);
  } else {
    console.log(
      `\n✅ All ${uniqueFiles.length} TypeScript source and test files have ≤ ${MAX_NON_BLANK_LINES} non-blank lines.\n`
    );
    process.exit(0);
  }
}

main();
