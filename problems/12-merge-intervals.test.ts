/**
 * Merge Intervals.  —  sort, then a linear scan
 *
 * Each interval is [start, end], closed. Merge every overlapping pair (touching
 * counts as overlap: [1,4] and [4,5] become [1,5]). Return the merged set.
 * Input is not necessarily sorted.
 *
 * O(n log n) from the sort, then O(n). The interesting part is the sort key
 * (start time) and the merge condition against the *last* merged interval,
 * not against every earlier one.
 *
 * Say why sorting first makes the rest linear, before you type.
 */

export function mergeIntervals(intervals: number[][]): number[][] {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard case", () => {
  assert.deepEqual(
    mergeIntervals([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ]),
    [
      [1, 6],
      [8, 10],
      [15, 18],
    ],
  );
});

test("touching endpoints merge", () => {
  assert.deepEqual(
    mergeIntervals([
      [1, 4],
      [4, 5],
    ]),
    [[1, 5]],
  );
});

test("input is not sorted", () => {
  assert.deepEqual(
    mergeIntervals([
      [8, 10],
      [1, 3],
      [15, 18],
      [2, 6],
    ]),
    [
      [1, 6],
      [8, 10],
      [15, 18],
    ],
  );
});

test("already disjoint, and containment", () => {
  assert.deepEqual(
    mergeIntervals([
      [1, 2],
      [3, 4],
    ]),
    [
      [1, 2],
      [3, 4],
    ],
  );
  assert.deepEqual(
    mergeIntervals([
      [1, 10],
      [2, 3],
      [4, 5],
    ]),
    [[1, 10]],
  );
});

test("edges", () => {
  assert.deepEqual(mergeIntervals([]), []);
  assert.deepEqual(mergeIntervals([[5, 5]]), [[5, 5]]);
});
