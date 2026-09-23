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
  if (s.length === 0) return 0;

  const freqs = new Map<string, number>();
  let left = 0;
  // Most frequent character count seen in *any* window so far — not necessarily
  // the current one. It never decreases; see below for why that is still correct.
  let maxFreq = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right]!;
    freqs.set(rightChar, (freqs.get(rightChar) ?? 0) + 1);
    maxFreq = Math.max(maxFreq, freqs.get(rightChar)!);

    // Replacements needed = window length − count of the letter we keep.
    // Valid when that is ≤ k, i.e. length ≤ maxFreq + k.
    // `if`, not `while`: we only care about the longest window, so when this one
    // is invalid we slide left by one (length stays the same as last step) instead
    // of shrinking smaller. A shorter valid window cannot beat `best`.
    if (right - left + 1 > maxFreq + k) {
      const leftChar = s[left]!;
      freqs.set(leftChar, freqs.get(leftChar)! - 1);
      left++;
      // Deliberately not decreasing maxFreq. A stale (too high) maxFreq can only
      // make us keep a window that is *currently* invalid. That cannot inflate
      // the answer: any window longer than maxFreq + k is impossible, and we
      // already earned that maxFreq in some earlier window, so best is already
      // at least min(n, maxFreq + k). Interviewers ask this more than they ask
      // you to write the loop.
    }

    best = Math.max(best, right - left + 1);
  }

  // O(n) time: left and right each walk s once. O(1) extra space if the alphabet
  // is A–Z, otherwise O(alphabet).
  return best;
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
