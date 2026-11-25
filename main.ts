// One-Liner Marathon entry for make.fun.
// Writes one one-line comedy joke (<= 280 chars) to /output/entry.txt.
// Pure Node stdlib, deterministic: the joke is fixed, no network, no randomness.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My inner voice narrates my meditation like a nature documentary: 'Here we see the human, sitting perfectly still, achieving nothing \u2014 majestically.'";

const chars = [...JOKE];
if (chars.length < 1 || chars.length > 280 || JOKE.trim().length === 0) {
  throw new Error(`joke must be 1-280 non-blank chars, got ${chars.length}`);
}
if (JOKE.includes("\n")) {
  throw new Error("joke must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // Best effort: the file is already written; readability is what matters.
}
console.log(`wrote ${outPath} (${[...JOKE].length} chars)`);
