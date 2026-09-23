/**
 * Longest Substring Without Repeating Characters.  —  sliding window
 *
 * Return the length of the longest substring of `s` with no repeated character.
 *
 * O(n) time. Two of the cases below break the naive version that resets the left
 * pointer to the previous occurrence without checking it is still inside the
 * window. Getting those right on the first pass is the actual signal here.
 */

export function lengthOfLongestSubstring(s: string): number {
  // "" → 0, one character → 1. A window needs two ends only once we are scanning.
  if (s.length < 2) return s.length;

  let left = 0;
  let longest = 0;
  // Frequency of each character *currently in the window*. A Map is the interview
  // default; Record<string, number> is the same idea. Counts, not last-seen indices:
  // this is the window pattern 05 and 06 reuse.
  const seen = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    // `s[right]` is defined because of the loop bound. The `!` tells TypeScript that;
    // `dict[s[right]]` without it is `number | undefined`, which is why `?? 0` (or
    // `|| 0`) is required on the read. Prefer `??` — `||` also treats a real 0 as
    // missing, which is harmless for counts starting at 0 but is the wrong habit.
    const c = s[right]!;
    seen.set(c, (seen.get(c) ?? 0) + 1);

    // Window is invalid while the character we just added appears twice. Shrink from
    // the left until it doesn't. Each index enters and leaves at most once, so the
    // inner while is still O(n) total, not O(n²).
    //
    // Why not jump `left` to the previous index of `c`?
    // That is the naive last-seen reset. It breaks when that previous index is
    // *already left of the window* — "abba": last 'a' is 0, but left is already 2
    // after the two 'b's; jumping left to 1 would pull 'b' back in. Same trap on
    // "dvdf". Shrinking one step at a time cannot jump backwards, so those cases
    // just work. If you do store last-seen indices, the fix is
    // `left = Math.max(left, prev + 1)`, never a raw assignment.
    while (seen.get(c)! > 1) {
      const leftChar = s[left]!;
      seen.set(leftChar, seen.get(leftChar)! - 1);
      left++;
    }

    // Inclusive window length. Update *after* the window is valid again.
    longest = Math.max(longest, right - left + 1);
  }

  // O(n) time: right and left each walk the string once.
  // O(min(n, alphabet)) extra space: the map holds distinct characters in the window.
  return longest;
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard cases", () => {
  assert.equal(lengthOfLongestSubstring("abcabcbb"), 3);
  assert.equal(lengthOfLongestSubstring("bbbbb"), 1);
  assert.equal(lengthOfLongestSubstring("pwwkew"), 3);
});

test("the two that break naive window resets", () => {
  assert.equal(lengthOfLongestSubstring("abba"), 2);
  assert.equal(lengthOfLongestSubstring("dvdf"), 3);
});

test("edges", () => {
  assert.equal(lengthOfLongestSubstring(""), 0);
  assert.equal(lengthOfLongestSubstring(" "), 1);
  assert.equal(lengthOfLongestSubstring("au"), 2);
});
