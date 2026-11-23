import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought a standing desk so I could sit at it more comfortably.";

// Runtime guards: the gate wants UTF-8 text of 1-200 characters, one line,
// one sentence, not only whitespace. Count code points, not UTF-16 units.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (LINE.trim().length === 0 || LINE.trim() !== LINE) {
  throw new Error("entry must not be blank or padded");
}
if (chars.some((c) => c === "\n" || c === "\r" || (c < " " && c !== "\t"))) {
  throw new Error("entry must be a single line with no control characters");
}
const terminators = chars.filter((c) => c === "." || c === "!" || c === "?").length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
