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

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MONOLOGUE =
  "Ah. The hero. Right on schedule, sword, destiny, the whole gleaming parade. Do come in. Mind the third step; it sags. I had the trapdoor oiled this morning, then forgot which lever. Sit, if you like. The throne's taken, by me mostly, and a cat I did not summon. You want the speech, don't you? The one about the kingdoms burning and the age of shadow. Very well. The kingdoms can burn on Thursday. Tonight the soup needs salt, the ravens need feeding, and you, you need a nap more than a nemesis. Stay, hero. We'll do the monologue tomorrow.";

// Deterministic gate: exactly 100 words, 1-600 Unicode code points,
// no newline, not only whitespace.
const WORDS = MONOLOGUE.split(/\s+/).filter(Boolean);
const LENGTH = [...MONOLOGUE].length;
if (
  WORDS.length !== 100 ||
  LENGTH < 1 ||
  LENGTH > 600 ||
  MONOLOGUE.includes('\n') ||
  MONOLOGUE.trim().length === 0
) {
  throw new Error(
    `Monologue must be exactly 100 words of 1-600 characters with no newline (got ${WORDS.length} words, ${LENGTH} characters).`,
  );
}

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), MONOLOGUE, 'utf8');
