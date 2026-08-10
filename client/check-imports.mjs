import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

function getFiles(dir) {
  let results = [];

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

const allFiles = getFiles(SRC);

const fileMap = new Map();

for (const file of allFiles) {
  const relative = path.relative(SRC, file).replace(/\\/g, "/");
  fileMap.set(relative.toLowerCase(), relative);
}

const sourceFiles = allFiles.filter((file) =>
  /\.(js|jsx|ts|tsx)$/.test(file)
);

let problems = 0;

for (const source of sourceFiles) {
  const content = fs.readFileSync(source, "utf8");

  const importRegex =
    /(?:import\s+(?:[\s\S]*?\s+from\s+)?|export\s+[\s\S]*?\s+from\s+|\bimport\s*)["']([^"']+)["']/g;

  let match;

  while ((match = importRegex.exec(content))) {
    const importPath = match[1];

    // Ignore packages such as react, react-router-dom, etc.
    if (!importPath.startsWith(".")) continue;

    const sourceDir = path.dirname(source);
    let resolved = path.resolve(sourceDir, importPath);

    const candidates = [
      resolved,
      `${resolved}.js`,
      `${resolved}.jsx`,
      `${resolved}.ts`,
      `${resolved}.tsx`,
    ];

    let actualFile = null;

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        actualFile = candidate;
        break;
      }
    }

    // Check directory/index files too
    if (!actualFile && fs.existsSync(resolved)) {
      const indexCandidates = [
        path.join(resolved, "index.js"),
        path.join(resolved, "index.jsx"),
        path.join(resolved, "index.ts"),
        path.join(resolved, "index.tsx"),
      ];

      for (const candidate of indexCandidates) {
        if (fs.existsSync(candidate)) {
          actualFile = candidate;
          break;
        }
      }
    }

    if (!actualFile) {
      console.log(
        `MISSING\nFile: ${path.relative(ROOT, source)}\nImport: ${importPath}\n`
      );
      problems++;
      continue;
    }

    const actualRelative = path
      .relative(sourceDir, actualFile)
      .replace(/\\/g, "/");

    const importedWithExtension = importPath;

    if (
      actualRelative.toLowerCase() === importedWithExtension.toLowerCase() &&
      actualRelative !== importedWithExtension
    ) {
      console.log(
        `CASE MISMATCH\nFile: ${path.relative(ROOT, source)}\n` +
        `Import: ${importPath}\n` +
        `Actual: ${actualRelative}\n`
      );

      problems++;
    }
  }
}

console.log("================================");

if (problems === 0) {
  console.log("✅ NO IMPORT CASE MISMATCHES OR MISSING LOCAL IMPORTS FOUND");
} else {
  console.log(`❌ Found ${problems} problem(s)`);
}