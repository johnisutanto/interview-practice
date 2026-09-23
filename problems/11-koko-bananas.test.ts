/**
 * Koko Eating Bananas.  —  binary search on the answer
 *
 * `piles[i]` bananas in pile i. Koko eats at a fixed speed of `k` bananas per
 * hour, one pile at a time (she waits out the hour if the pile is smaller than k).
 * She has `h` hours. Return the minimum integer k that lets her finish.
 *
 * You are not searching an index in `piles`. You are searching the *answer space*
 * [1, max(piles)]. The predicate "can she finish at speed k?" is monotonic: if
 * k works, k+1 works. That is when binary search on the answer applies.
 *
 * Hours needed at speed k is sum over piles of ceil(pile / k). Watch integer
 * division: Math.ceil(pile / k) is fine; truncating too early is the usual bug.
 *
 * Say the search range and the predicate before you type.
 */

export function minEatingSpeed(piles: number[], h: number): number {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard cases", () => {
  assert.equal(minEatingSpeed([3, 6, 7, 11], 8), 4);
  assert.equal(minEatingSpeed([30, 11, 23, 4, 20], 5), 30);
  assert.equal(minEatingSpeed([30, 11, 23, 4, 20], 6), 23);
});

test("h equals the number of piles: must eat the biggest pile in one hour", () => {
  assert.equal(minEatingSpeed([1, 1, 1, 999], 4), 999);
});

test("edges", () => {
  assert.equal(minEatingSpeed([1], 1), 1);
  assert.equal(minEatingSpeed([1], 100), 1);
});
