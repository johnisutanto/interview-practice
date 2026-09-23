/**
 * Sum of every positive multiple of 3 or 5 or 7 that is strictly less than n.
 * Inclusion-exclusion so 15, 21, 35, 105 are not counted twice.
 */

function sumMultiplesBelow(n, k) {
  const count = Math.floor((n - 1) / k);
  return (k * count * (count + 1)) / 2;
}

export function computeMultiplesSum(n) {
  return (
    sumMultiplesBelow(n, 3) +
    sumMultiplesBelow(n, 5) +
    sumMultiplesBelow(n, 7) -
    sumMultiplesBelow(n, 15) -
    sumMultiplesBelow(n, 21) -
    sumMultiplesBelow(n, 35) +
    sumMultiplesBelow(n, 105)
  );
}

import assert from "node:assert/strict";
import { test } from "node:test";

test("example n = 12", () => {
  // 3+5+6+7+9+10 = 40; 12 is a multiple of 3 but not strictly below 12
  assert.equal(computeMultiplesSum(12), 40);
});

test("nothing below 3", () => {
  assert.equal(computeMultiplesSum(0), 0);
  assert.equal(computeMultiplesSum(1), 0);
  assert.equal(computeMultiplesSum(3), 0);
});

test("first multiples", () => {
  assert.equal(computeMultiplesSum(4), 3);
  assert.equal(computeMultiplesSum(8), 3 + 5 + 6 + 7);
});

test("matches a brute loop", () => {
  const brute = (n) => {
    let s = 0;
    for (let i = 1; i < n; i++) {
      if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) s += i;
    }
    return s;
  };
  for (const n of [1, 10, 12, 20, 100, 105, 106, 1000]) {
    assert.equal(computeMultiplesSum(n), brute(n));
  }
});
