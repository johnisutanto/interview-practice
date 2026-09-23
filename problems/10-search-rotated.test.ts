/**
 * Search in Rotated Sorted Array.  —  binary search
 *
 * `nums` was sorted ascending, then rotated at an unknown pivot. All values unique.
 * Return the index of `target`, or -1 if it is missing. O(log n) time, O(1) space.
 *
 * One half of [lo, hi] is always sorted. That is the whole problem: identify the
 * sorted half, then decide whether target lives there. If you cannot say which
 * half is sorted at a given mid, you do not have the algorithm yet.
 *
 * Say which half is sorted before you move lo or hi.
 */

export function searchRotated(nums: number[], target: number): number {
  if (nums.length === 0) return -1;
  let left = 0, right = nums.length - 1, mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

  }

  return -1;
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("finds the target in a rotated array", () => {
  assert.equal(searchRotated([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assert.equal(searchRotated([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assert.equal(searchRotated([4, 5, 6, 7, 0, 1, 2], 4), 0);
  assert.equal(searchRotated([4, 5, 6, 7, 0, 1, 2], 2), 6);
});

test("no rotation is just ordinary binary search", () => {
  assert.equal(searchRotated([1, 2, 3, 4, 5], 3), 2);
  assert.equal(searchRotated([1, 2, 3, 4, 5], 6), -1);
});

test("edges", () => {
  assert.equal(searchRotated([], 1), -1);
  assert.equal(searchRotated([1], 1), 0);
  assert.equal(searchRotated([1], 0), -1);
  assert.equal(searchRotated([3, 1], 1), 1);
});
