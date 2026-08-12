/**
 * Minimum Window Substring.  —  sliding window, hard
 *
 * Return the shortest substring of `s` containing every character of `t`
 * including duplicates. Return "" if there is none.
 *
 * O(|s| + |t|) time. This is the one that separates people who have memorised
 * the sliding window from people who understand it: the window grows to become
 * valid and shrinks while it stays valid, and you need a cheap test for "still
 * valid" rather than rescanning counts.
 *
 * If you only get one problem fully right today, make it this one.
 */

export function minWindow(s: string, t: string): string {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard case", () => {
  assert.equal(minWindow("ADOBECODEBANC", "ABC"), "BANC");
});

test("duplicates in t must all be covered", () => {
  assert.equal(minWindow("a", "aa"), "");
  assert.equal(minWindow("aa", "aa"), "aa");
  assert.equal(minWindow("bba", "ab"), "ba");
});

test("trivial windows", () => {
  assert.equal(minWindow("a", "a"), "a");
  assert.equal(minWindow("ab", "b"), "b");
});

test("no window exists", () => {
  assert.equal(minWindow("", "a"), "");
  assert.equal(minWindow("abc", "d"), "");
  assert.equal(minWindow("abc", ""), "");
});
