/**
 * Longest Repeating Character Replacement.  —  sliding window with counts
 *
 * You may change at most `k` characters in `s` to any other uppercase letter.
 * Return the length of the longest substring containing one repeated letter
 * after those changes.
 *
 * A window is valid when (window length − count of its most frequent character)
 * is at most k. O(n) time.
 *
 * Worth saying out loud: whether you recompute the max frequency each step or
 * keep a running one that never decreases, and why the second is still correct.
 * That question gets asked more often than the solution itself.
 */

export function characterReplacement(s: string, k: number): number {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard cases", () => {
  assert.equal(characterReplacement("ABAB", 2), 4);
  assert.equal(characterReplacement("AABABBA", 1), 4);
});

test("no replacements allowed", () => {
  assert.equal(characterReplacement("AABBB", 0), 3);
  assert.equal(characterReplacement("A", 0), 1);
});

test("k covers the whole string", () => {
  assert.equal(characterReplacement("ABCDE", 4), 5);
  assert.equal(characterReplacement("AAAA", 2), 4);
});

test("edges", () => {
  assert.equal(characterReplacement("", 0), 0);
  assert.equal(characterReplacement("", 3), 0);
});
