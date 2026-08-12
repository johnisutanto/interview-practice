/**
 * Subarray Sum Equals K.  —  prefix sums with a hash map
 *
 * Return how many contiguous subarrays of `nums` sum to exactly `k`.
 * Values may be negative, which is exactly why a sliding window does not work.
 *
 * O(n) time, O(n) space. Be ready to explain, unprompted, why the window
 * approach that solved the last two problems fails here — that comparison is
 * often the real question.
 *
 * The seed entry (prefix sum 0 seen once) is the detail people miss.
 */

export function subarraySum(nums: number[], k: number): number {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard cases", () => {
  assert.equal(subarraySum([1, 1, 1], 2), 2);
  assert.equal(subarraySum([1, 2, 3], 3), 2);
});

test("negatives, where a sliding window would fail", () => {
  assert.equal(subarraySum([1, -1, 0], 0), 3);
  assert.equal(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7), 4);
});

test("subarrays starting at index zero — the seed entry", () => {
  assert.equal(subarraySum([1, 2, 3], 6), 1);
  assert.equal(subarraySum([5], 5), 1);
});

test("edges", () => {
  assert.equal(subarraySum([], 0), 0);
  assert.equal(subarraySum([1, 2, 3], 100), 0);
});
