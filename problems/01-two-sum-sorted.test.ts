/**
 * Two Sum on a sorted array.  —  two pointers
 *
 * Given `nums` sorted ascending and a `target`, return the indices [i, j] with
 * i < j such that nums[i] + nums[j] === target, or null if no pair exists.
 * Exactly one pair at most. Zero-indexed.
 *
 * Do it in O(n) time and O(1) space. A hash map also works and is O(n) time but
 * O(n) space — if you reach for that, say out loud why the sortedness lets you
 * do better, because that is the thing being tested.
 *
 * Say the approach before you type.
 */

export function twoSumSorted(nums: number[], target: number): [number, number] | null {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("finds the pair", () => {
  assert.deepEqual(twoSumSorted([2, 7, 11, 15], 9), [0, 1]);
  assert.deepEqual(twoSumSorted([2, 3, 4], 6), [0, 2]);
  assert.deepEqual(twoSumSorted([-3, -1, 0, 4], 3), [1, 3]);
});

test("handles negatives and duplicates", () => {
  assert.deepEqual(twoSumSorted([-1, 0], -1), [0, 1]);
  assert.deepEqual(twoSumSorted([1, 1, 2], 2), [0, 1]);
});

test("returns null when there is no pair", () => {
  assert.equal(twoSumSorted([1, 2, 3, 4], 100), null);
  assert.equal(twoSumSorted([5], 5), null);
  assert.equal(twoSumSorted([], 0), null);
});
