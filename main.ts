// Till Firmware Do Us Part — a robot's wedding vow, one sentence.
// Writes the vow to /output/entry.txt for the make.fun program/v1 harness.
// Node 22 stdlib only; no network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I promised to love you through every update, but the firmware changed, and now I don't recognize the person I married.";

// RULES.txt gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, and the entry is a single sentence.
const chars = [...LINE].length;
const words = LINE.trim().split(/\s+/).length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}
if (chars !== 118) {
  throw new Error(`line is ${chars} characters, expected exactly 118`);
}
if (words !== 21) {
  throw new Error(`line is ${words} words, expected exactly 21`);
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("line must not be empty or padded with whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}
if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars} characters, ${words} words to /output/entry.txt`);
