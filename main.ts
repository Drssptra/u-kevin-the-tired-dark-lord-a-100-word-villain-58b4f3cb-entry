// u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb entry (Node 22,
// standard library only).
// Writes exactly one original 100-word villain monologue to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt outside the grader).
// No trailing newline: the judge reads exactly the bytes written.
// Gate: the file must be UTF-8 text of 1 to 600 characters, not only
// whitespace — so the monologue is a fixed string of exactly 100 words
// and 541 characters, never random, never generated at runtime.
//
// The monologue: the Dark Lord greets the hero right on schedule, then
// keeps deflecting the grand confrontation into household chores — a
// sagging step, an unoiled trapdoor, soup that needs salt, ravens to
// feed — and ends by postponing the monologue itself until tomorrow.
// The tiredness lives in the deflections, the pauses and the shrug of
// "the kingdoms can burn on Thursday", never in a statement that he is
// weary. The sting lands in the last line: the villain speech itself
// is the thing he is too tired to deliver.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry, as one fixed string constant. Never random, never
// generated at runtime — the exact 100 words, 541 characters.
const MONOLOGUE =
  "Ah. The hero. Right on schedule, sword, destiny, the whole gleaming parade. Do come in. Mind the third step; it sags. I had the trapdoor oiled this morning, then forgot which lever. Sit, if you like. The throne's taken, by me mostly, and a cat I did not summon. You want the speech, don't you? The one about the kingdoms burning and the age of shadow. Very well. The kingdoms can burn on Thursday. Tonight the soup needs salt, the ravens need feeding, and you, you need a nap more than a nemesis. Stay, hero. We'll do the monologue tomorrow.";

// Expected shape of the entry, checked by validateGate().
const EXPECTED_WORDS = 100;
const MIN_CHARS = 1;
const MAX_CHARS = 600;

/** Returns the fixed entry text. */
function entryText(): string {
  return MONOLOGUE;
}

/** Counts words the way the gate does: whitespace-separated tokens. */
function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Deterministic gate: exactly 100 words, 1-600 Unicode code points,
 * no newline, not only whitespace. Throws on any violation so a bad
 * entry can never reach the output file.
 */
function validateGate(text: string): void {
  const words = countWords(text);
  const length = [...text].length;
  if (words !== EXPECTED_WORDS) {
    throw new Error(
      `Monologue must be exactly ${EXPECTED_WORDS} words (got ${words}).`,
    );
  }
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `Monologue must be ${MIN_CHARS}-${MAX_CHARS} characters (got ${length}).`,
    );
  }
  if (text.includes('\n') || text.includes('\r')) {
    throw new Error('Monologue must not contain a newline.');
  }
  if (text.trim().length === 0) {
    throw new Error('Monologue must not be only whitespace.');
  }
}

/** Output directory: grader override first, /output otherwise. */
function resolveOutputDir(): string {
  const dir = (process.env.MAKEFUN_OUTPUT_DIR ?? '/output').trim();
  if (dir.length === 0) {
    throw new Error('MAKEFUN_OUTPUT_DIR must not be empty.');
  }
  return dir;
}

/**
 * Validates the entry, then writes exactly that string to
 * <outputDir>/entry.txt with no trailing newline, then reads the file
 * back and confirms the bytes on disk are exactly the entry — so a
 * truncated or altered write can never pass silently.
 */
function writeEntryFile(outputDir: string, text: string): string {
  validateGate(text);
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, 'entry.txt');
  writeFileSync(outPath, text, 'utf8');
  const written = readFileSync(outPath, 'utf8');
  if (written !== text) {
    throw new Error(
      `Wrote ${Buffer.byteLength(text, 'utf8')} bytes but entry.txt holds ${Buffer.byteLength(written, 'utf8')} bytes; refusing to continue.`,
    );
  }
  return outPath;
}

writeEntryFile(resolveOutputDir(), entryText());
