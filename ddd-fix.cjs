/**
 * ddd-fix.js
 * Applies safe DDD variable substitutions across all JS/HTML files.
 * Run with: node ddd-fix.js
 */

const fs = require("fs");
const path = require("path");

// ============================================================
// Safe substitution map: exact string match → DDD replacement
// Only includes substitutions with zero or near-zero visual risk.
// ============================================================
const substitutions = [
  // --- Zero values (100% safe, purely cosmetic compliance) ---
  { from: /:\s*0px\b/g,                      to: ": var(--ddd-spacing-0)" },
  { from: /:\s*0 0 0 0\b/g,                  to: ": var(--ddd-spacing-0)" },
  { from: /inset:\s*0\b/g,                   to: "inset: var(--ddd-spacing-0)" },
  { from: /top:\s*0\b/g,                     to: "top: var(--ddd-spacing-0)" },
  { from: /left:\s*0\b/g,                    to: "left: var(--ddd-spacing-0)" },
  { from: /right:\s*0\b/g,                   to: "right: var(--ddd-spacing-0)" },
  { from: /bottom:\s*0\b/g,                  to: "bottom: var(--ddd-spacing-0)" },
  { from: /margin:\s*0\b/g,                  to: "margin: var(--ddd-spacing-0)" },
  { from: /padding:\s*0\b/g,                 to: "padding: var(--ddd-spacing-0)" },
  { from: /gap:\s*0\b/g,                     to: "gap: var(--ddd-spacing-0)" },

  // --- Border radius (audit-confirmed matches) ---
  { from: /border-radius:\s*2px\b/g,         to: "border-radius: var(--ddd-radius-xs)" },
  { from: /border-radius:\s*3px\b/g,         to: "border-radius: var(--ddd-radius-xs)" },
  { from: /border-radius:\s*4px\b/g,         to: "border-radius: var(--ddd-radius-xs)" },
  { from: /border-radius:\s*6px\b/g,         to: "border-radius: var(--ddd-radius-sm)" },
  { from: /border-radius:\s*8px\b/g,         to: "border-radius: var(--ddd-radius-sm)" },

  // --- Spacing scale (DDD uses 4px increments) ---
  // Only replacing values that map cleanly to the scale
  { from: /gap:\s*4px\b/g,                   to: "gap: var(--ddd-spacing-1)" },
  { from: /gap:\s*8px\b/g,                   to: "gap: var(--ddd-spacing-2)" },
  { from: /gap:\s*12px\b/g,                  to: "gap: var(--ddd-spacing-3)" },
  { from: /gap:\s*16px\b/g,                  to: "gap: var(--ddd-spacing-4)" },
  { from: /gap:\s*20px\b/g,                  to: "gap: var(--ddd-spacing-5)" },
  { from: /gap:\s*24px\b/g,                  to: "gap: var(--ddd-spacing-6)" },
  { from: /margin-bottom:\s*4px\b/g,         to: "margin-bottom: var(--ddd-spacing-1)" },
  { from: /margin-bottom:\s*8px\b/g,         to: "margin-bottom: var(--ddd-spacing-2)" },
  { from: /margin-bottom:\s*12px\b/g,        to: "margin-bottom: var(--ddd-spacing-3)" },
  { from: /margin-bottom:\s*16px\b/g,        to: "margin-bottom: var(--ddd-spacing-4)" },
  { from: /margin-bottom:\s*28px\b/g,        to: "margin-bottom: var(--ddd-spacing-7)" },
  { from: /margin-bottom:\s*32px\b/g,        to: "margin-bottom: var(--ddd-spacing-8)" },
  { from: /margin-top:\s*4px\b/g,            to: "margin-top: var(--ddd-spacing-1)" },
  { from: /margin-top:\s*8px\b/g,            to: "margin-top: var(--ddd-spacing-2)" },
  { from: /margin-top:\s*12px\b/g,           to: "margin-top: var(--ddd-spacing-3)" },
  { from: /margin-top:\s*24px\b/g,           to: "margin-top: var(--ddd-spacing-6)" },
  { from: /margin-left:\s*36px\b/g,          to: "margin-left: var(--ddd-spacing-9)" },
  { from: /padding-top:\s*12px\b/g,          to: "padding-top: var(--ddd-spacing-3)" },
  { from: /padding-bottom:\s*6px\b/g,        to: "padding-bottom: var(--ddd-spacing-2)" },

  // --- Safe color swap ---
  { from: /color:\s*white\b/g,               to: "color: var(--ddd-theme-default-white)" },
];

// Files and folders to skip entirely
const SKIP = ["node_modules", ".git", "ddd-fix.js", "ddd-fix-backup"];

// File extensions to process
const EXTENSIONS = [".js", ".html"];

// ============================================================
// Helpers
// ============================================================

/**
 * Recursively collect all files with matching extensions under a directory.
 * @param {string} dir - Root directory to walk
 * @returns {string[]} - Array of absolute file paths
 */
function collectFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    if (SKIP.includes(entry)) continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (EXTENSIONS.includes(path.extname(entry))) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Apply all substitutions to a single file.
 * Writes a .bak backup before modifying.
 * Returns a summary of changes made.
 * @param {string} filePath
 * @returns {{ file: string, changes: number, details: string[] }}
 */
function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let content = original;
  const details = [];

  for (const { from, to } of substitutions) {
    const before = content;
    content = content.replace(from, to);
    if (content !== before) {
      // Count how many replacements this rule made
      const count = (before.match(from) || []).length;
      details.push(`  ${count}× ${from.source}  →  ${to}`);
    }
  }

  const changed = content !== original;
  if (changed) {
    // Write backup before overwriting
    fs.writeFileSync(filePath + ".bak", original, "utf8");
    fs.writeFileSync(filePath, content, "utf8");
  }

  return { file: filePath, changes: details.length, details };
}

// ============================================================
// Main
// ============================================================
const root = process.cwd();
console.log(`\n🔧 DDD Fix Script`);
console.log(`📁 Root: ${root}\n`);

const files = collectFiles(root);
console.log(`Found ${files.length} files to process...\n`);

let totalChanges = 0;

for (const file of files) {
  const result = processFile(file);
  if (result.changes > 0) {
    console.log(`✅ ${path.relative(root, result.file)} (${result.changes} rules applied)`);
    for (const d of result.details) console.log(d);
    console.log();
    totalChanges += result.changes;
  }
}

if (totalChanges === 0) {
  console.log("✨ Nothing to change — all files already compliant.");
} else {
  console.log(`\n🎉 Done! ${totalChanges} substitution rules applied across ${files.length} files.`);
  console.log(`💾 Backups saved as *.bak files. Delete them once you've verified the changes.`);
}