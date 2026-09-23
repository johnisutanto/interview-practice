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
  // Empty or a single line cannot form a container.
  if (heights.length < 2) return 0;

  let left = 0;
  let right = heights.length - 1;
  let best = 0;

  while (left < right) {
    // Record area *before* moving, or the full-width container is skipped.
    const area = Math.min(heights[left]!, heights[right]!) * (right - left);
    best = Math.max(best, area);

    // Why move the shorter line, never the taller:
    // Area is min(height) * width. If you move the taller pointer, width shrinks
    // and height is still capped by the shorter line, so area cannot increase.
    // The only candidate that might improve is a taller line replacing the short
    // one, so that is the pointer you throw away.
    //
    // When the two heights are equal, either pointer is fine (this moves right).
    // Same height, so neither end can beat the current area with a narrower width.
    if (heights[left]! < heights[right]!) left++;
    else right--;
  }

  // O(n) time: each index is visited at most once.
  // O(1) extra space: two pointers and a running best.
  return best;
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
