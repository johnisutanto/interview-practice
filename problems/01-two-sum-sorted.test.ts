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
  // Empty or a single element cannot form a pair. Handle that before pointers.
  if (nums.length < 2) return null;

  // `left` / `right` is the interview idiom. `while (left < right)` is a pair;
  // `<=` would compare an element with itself.
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // Compute the sum once so you can point at it when walking an example out loud.
    const sum = nums[left]! + nums[right]!;
    if (sum === target) return [left, right];

    // Why this move, not the other pointer:
    // The array is sorted. nums[left] is the smallest value still in play.
    // If sum is already too small, every remaining pair that still uses this left
    // with a smaller right is even smaller — so this left is dead, throw it away.
    // Symmetric: if sum is too big, this right cannot be part of any remaining answer.
    if (sum < target) left++;
    else right--;
  }

  // O(n) time: each index is visited at most once.
  // O(1) extra space: two integers. A hash map is also O(n) time but O(n) space,
  // and it ignores that the input is sorted, which is why this problem exists.
  return null;
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
