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
  throw new Error("not implemented");
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
