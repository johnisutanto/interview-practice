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
  if (nums.length < 3) return [];

  // Copy, then numeric sort. Default sort is lexicographic ([1, 10, 2]), and
  // sorting in place mutates the caller's array — a footgun in a screen.
  //
  // Why the O(n log n) sort is worth it: duplicates become adjacent, so skipping
  // them is a neighbour check, and the inner pair can use the O(1)-space two-pointer
  // scan from 01 instead of a hash set.
  const sorted = [...nums].sort((x, y) => x - y);
  const results: number[][] = [];

  // `current` is the first number of the triplet. Once it is positive, the remaining
  // values are also ≥ it, so no triplet can sum to 0 — stop.
  for (let current = 0; current < sorted.length && sorted[current]! <= 0; current++) {
    // Skip duplicate first-numbers. The first occurrence already found every triplet
    // that starts with this value; running it again would emit the same triplets.
    if (current > 0 && sorted[current] === sorted[current - 1]) continue;

    let left = current + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const total = sorted[current]! + sorted[left]! + sorted[right]!;

      if (total === 0) {
        results.push([sorted[current]!, sorted[left]!, sorted[right]!]);
        left++;
        right--;
        // Same as the outer skip, but for the pair. Without this, [-2, 0, 0, 2, 2]
        // emits [-2, 0, 2] twice: after the first hit, left still lands on 0 and
        // right still lands on 2. Skip while the *new* value equals the one you
        // just used. Skipping before the first hit would drop a valid triplet.
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      } else if (total < 0) {
        // Sorted: too small means this left cannot pair with any remaining right.
        left++;
      } else {
        right--;
      }
    }
  }

  // O(n²) time: n choices for `current`, O(n) two-pointer scan each. Sort is n log n
  // and does not dominate. O(1) extra space besides the output.
  return results;
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
  // Inner-pair duplicates: the outer skip on `current` is not enough here.
  assert.equal(normalise(threeSum([-2, 0, 0, 2, 2])), normalise([[-2, 0, 2]]));
});

test("no triplet sums to zero", () => {
  assert.deepEqual(threeSum([0, 1, 1]), []);
  assert.deepEqual(threeSum([1, 2, 3]), []);
  assert.deepEqual(threeSum([]), []);
});
