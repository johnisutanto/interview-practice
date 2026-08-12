/**
 * 3Sum.  —  sort, then two pointers
 *
 * Return every unique triplet [a, b, c] from `nums` with a + b + c === 0.
 * No duplicate triplets. Order of triplets does not matter; the test normalises.
 *
 * O(n²) time. The interesting part is not the two-pointer scan, it is skipping
 * duplicates without accidentally skipping a valid triplet. Expect to be asked
 * why the sort is worth its O(n log n).
 */

export function threeSum(nums: number[]): number[][] {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

/** Triplet order is irrelevant, so compare as sorted sets of sorted triplets. */
function normalise(triplets: number[][]): string {
  return JSON.stringify(
    triplets.map((t) => [...t].sort((a, b) => a - b)).sort((a, b) => a[0]! - b[0]! || a[1]! - b[1]!),
  );
}

test("the standard case", () => {
  assert.equal(
    normalise(threeSum([-1, 0, 1, 2, -1, -4])),
    normalise([
      [-1, -1, 2],
      [-1, 0, 1],
    ]),
  );
});

test("duplicates collapse to one triplet", () => {
  assert.equal(normalise(threeSum([0, 0, 0])), normalise([[0, 0, 0]]));
  assert.equal(normalise(threeSum([0, 0, 0, 0])), normalise([[0, 0, 0]]));
});

test("no triplet sums to zero", () => {
  assert.deepEqual(threeSum([0, 1, 1]), []);
  assert.deepEqual(threeSum([1, 2, 3]), []);
  assert.deepEqual(threeSum([]), []);
});
