import fs from "node:fs";
import path from "node:path";

const allowedExtensions = new Set([".css", ".scss", ".less", ".ts", ".tsx", ".js", ".jsx", ".json"]);
const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "storybook-static",
  ".storybook-cache",
  ".turbo",
  "public",
]);
const allowedFiles = new Set(
  ["src/styles/branding.css", "design/figma-tokens.json"].map((file) => path.normalize(file))
);
const hexPattern = /#(?:[A-Fa-f0-9]{3,6})\b/g;

const findings = [];

function shouldIgnoreDir(dir) {
  return ignoredDirectories.has(path.basename(dir));
}

function shouldScanFile(filePath) {
  const ext = path.extname(filePath);
  return allowedExtensions.has(ext);
}

function scanFile(filePath) {
  if (!shouldScanFile(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (!hexPattern.test(content)) return;

  const relativePath = path.normalize(path.relative(process.cwd(), filePath));
  const isBrandingToken =
    allowedFiles.has(relativePath) || relativePath.startsWith(path.normalize(`design${path.sep}`));
  if (isBrandingToken) return;

  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    const match = line.match(hexPattern);
    if (match) {
      findings.push({
        file: filePath,
        line: index + 1,
        value: match.join(", "),
      });
    }
  });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (shouldIgnoreDir(fullPath)) continue;
      walk(fullPath);
    } else if (entry.isFile()) {
      scanFile(fullPath);
    }
  }
}

walk(process.cwd());

if (findings.length) {
  console.error("Branding check failed: detected raw hex values outside the token file.\n");
  findings.forEach((finding) => {
    console.error(`- ${finding.file}:${finding.line} → ${finding.value}`);
  });
  console.error("\nHex is only allowed in src/styles/branding.css or design/ token exports.");
  console.error("Use design tokens (CSS variables + Tailwind tokens) instead.");
  process.exit(1);
}

