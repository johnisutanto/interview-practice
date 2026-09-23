/**
 * Atom moves: PROTON / NEUTRON / ALPHA
 *
 * Net change after A alphas, P protons, N neutrons:
 *   p' = p + P - 2A
 *   n' = n + N - 2A
 * so P = pTarget - pStart + 2A (same for N). Smallest non-negative A that
 * makes both P and N ≥ 0. Order: ALPHA only when p≥2 and n≥2; otherwise add.
 */

export function solve(
  protonsStart: number,
  neutronsStart: number,
  protonsTarget: number,
  neutronsTarget: number,
): string[] {
  let alphas = Math.max(
    0,
    Math.ceil((protonsStart - protonsTarget) / 2),
    Math.ceil((neutronsStart - neutronsTarget) / 2),
  );
  let protons = protonsTarget - protonsStart + 2 * alphas;
  let neutrons = neutronsTarget - neutronsStart + 2 * alphas;

  let p = protonsStart;
  let n = neutronsStart;
  const actions: string[] = [];

  while (alphas > 0 || protons > 0 || neutrons > 0) {
    if (alphas > 0 && p >= 2 && n >= 2) {
      actions.push("ALPHA");
      p -= 2;
      n -= 2;
      alphas -= 1;
    } else if (alphas > 0 && p < 2 && protons > 0) {
      actions.push("PROTON");
      p += 1;
      protons -= 1;
    } else if (alphas > 0 && n < 2 && neutrons > 0) {
      actions.push("NEUTRON");
      n += 1;
      neutrons -= 1;
    } else if (protons > 0) {
      actions.push("PROTON");
      p += 1;
      protons -= 1;
    } else if (neutrons > 0) {
      actions.push("NEUTRON");
      n += 1;
      neutrons -= 1;
    } else {
      throw new Error("no legal move");
    }
  }

  return actions;
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

function apply(
  p: number,
  n: number,
  actions: string[],
): { p: number; n: number } {
  for (const a of actions) {
    if (a === "PROTON") p += 1;
    else if (a === "NEUTRON") n += 1;
    else if (a === "ALPHA") {
      assert.ok(p >= 2 && n >= 2, "ALPHA with too few nucleons");
      p -= 2;
      n -= 2;
    } else {
      assert.fail(`unknown action ${a}`);
    }
    assert.ok(p >= 0 && n >= 0, "negative nucleons");
  }
  return { p, n };
}

function check(
  p0: number,
  n0: number,
  pT: number,
  nT: number,
  expected?: string[],
): void {
  const actions = solve(p0, n0, pT, nT);
  if (expected) assert.deepEqual(actions, expected);
  const end = apply(p0, n0, actions);
  assert.equal(end.p, pT);
  assert.equal(end.n, nT);
}

test("example: ALPHA then three PROTON is two up, one right", () => {
  // (2,2) → (3,0): net +1 proton, −2 neutrons
  check(2, 2, 3, 0, ["ALPHA", "PROTON", "PROTON", "PROTON"]);
});

test("already there", () => {
  check(1, 1, 1, 1, []);
});

test("only add", () => {
  check(0, 0, 2, 1, ["PROTON", "PROTON", "NEUTRON"]);
});

test("pure alphas", () => {
  check(4, 4, 0, 0, ["ALPHA", "ALPHA"]);
});

test("must add before alpha", () => {
  check(1, 1, 0, 0);
  check(3, 3, 0, 0);
  check(2, 0, 0, 0);
  check(0, 0, 0, 0);
});

test("asymmetric targets", () => {
  check(5, 1, 2, 4);
  check(1, 8, 7, 2);
  check(4, 2, 1, 1);
});
