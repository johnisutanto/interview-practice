/**
 * Container With Most Water.  —  two pointers
 *
 * `heights[i]` is a vertical line at x = i. Pick two lines that together with the
 * x-axis hold the most water. Return that area.
 *
 * Area between i and j is min(heights[i], heights[j]) * (j - i).
 *
 * O(n) time, O(1) space. The whole problem is one insight: when you move a
 * pointer, which one and why. Be able to justify it — "moving the taller one can
 * never help, because the width shrinks and the height is capped by the shorter".
 */

export function maxArea(heights: number[]): number {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard case", () => {
  assert.equal(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
});

test("small inputs", () => {
  assert.equal(maxArea([1, 1]), 1);
  assert.equal(maxArea([1, 2, 4, 3]), 4);
});

test("nothing to hold water", () => {
  assert.equal(maxArea([5]), 0);
  assert.equal(maxArea([]), 0);
  assert.equal(maxArea([0, 0, 0]), 0);
});
