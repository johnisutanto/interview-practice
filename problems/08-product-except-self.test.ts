/**
 * Product of Array Except Self.  —  prefix and suffix products
 *
 * Return an array where result[i] is the product of every element except nums[i].
 *
 * Two constraints, both of which are the point: no division, and O(n) time. The
 * output array does not count toward space, so aim for O(1) extra.
 *
 * The zero cases are where division-based solutions quietly die. Mention that
 * before writing anything — noticing the constraint exists for a reason reads
 * better than discovering it in a test.
 */

export function productExceptSelf(nums: number[]): number[] {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

/**
 * A correct prefix/suffix solution produces -0 wherever a negative multiplies a
 * zero, and strict deep-equal treats -0 and 0 as different values. That is an
 * IEEE 754 detail, not a bug in your algorithm, so it is normalised away here.
 * Worth knowing it exists — it bites in real code when a -0 reaches a UI.
 */
function noNegativeZero(xs: number[]): number[] {
  return xs.map((x) => x + 0);
}

test("the standard case", () => {
  assert.deepEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
  assert.deepEqual(productExceptSelf([2, 3]), [3, 2]);
});

test("a single zero", () => {
  assert.deepEqual(noNegativeZero(productExceptSelf([-1, 1, 0, -3, 3])), [0, 0, 9, 0, 0]);
});

test("two zeros make everything zero", () => {
  assert.deepEqual(noNegativeZero(productExceptSelf([0, 0])), [0, 0]);
  assert.deepEqual(noNegativeZero(productExceptSelf([1, 0, 0, 4])), [0, 0, 0, 0]);
});

test("negatives keep their sign", () => {
  assert.deepEqual(productExceptSelf([-1, -2, -3]), [6, 3, 2]);
});

test("edges", () => {
  assert.deepEqual(productExceptSelf([]), []);
  assert.deepEqual(productExceptSelf([7]), [1]);
});
