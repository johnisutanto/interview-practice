/**
 * Course Schedule.  —  graph, cycle detection
 *
 * `numCourses` courses labelled 0 .. numCourses-1. `prerequisites[i] = [a, b]`
 * means you must take b before a. Return true if you can finish every course
 * (the graph has no cycle), false otherwise.
 *
 * This is a directed graph. A cycle means a circular dependency. Two standard
 * finishes: Kahn's algorithm (BFS on indegrees) or DFS with a 3-colour / visiting
 * mark to distinguish "still on the stack" from "already done".
 *
 * Edge direction: [a, b] is an edge b → a (b must come first). Mixing this up is
 * the usual wrong-answer, not the traversal.
 *
 * Say "directed graph, detect a cycle" before you type.
 */

export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("acyclic: can finish", () => {
  assert.equal(canFinish(2, [[1, 0]]), true);
  assert.equal(
    canFinish(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ]),
    true,
  );
});

test("a cycle: cannot finish", () => {
  assert.equal(
    canFinish(2, [
      [1, 0],
      [0, 1],
    ]),
    false,
  );
  assert.equal(
    canFinish(3, [
      [0, 1],
      [1, 2],
      [2, 0],
    ]),
    false,
  );
});

test("no prerequisites, and a self-loop", () => {
  assert.equal(canFinish(3, []), true);
  assert.equal(canFinish(1, []), true);
  assert.equal(canFinish(1, [[0, 0]]), false);
});
