/**
 * Number of Islands.  —  DFS or BFS on a grid
 *
 * `grid` is a 2D array of "1" (land) and "0" (water). An island is 4-connected
 * land (up, down, left, right — not diagonals). Return how many islands there are.
 *
 * Each cell is a graph node. Walk every cell; when you find unvisited land,
 * increment the count and flood-fill that island so you never count it again.
 * Flood-fill may mutate the grid (turn land to water) or use a visited set.
 *
 * Bounds checks before every neighbour. Off-grid is the usual crash.
 *
 * Say "graph, cells are nodes, flood-fill per island" before you type.
 */

export function numIslands(grid: string[][]): number {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("three islands", () => {
  assert.equal(
    numIslands([
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ]),
    3,
  );
});

test("one island", () => {
  assert.equal(
    numIslands([
      ["1", "1", "1"],
      ["0", "1", "0"],
      ["1", "1", "1"],
    ]),
    1,
  );
});

test("no land, all land, empty", () => {
  assert.equal(
    numIslands([
      ["0", "0"],
      ["0", "0"],
    ]),
    0,
  );
  assert.equal(
    numIslands([
      ["1", "1"],
      ["1", "1"],
    ]),
    1,
  );
  assert.equal(numIslands([]), 0);
  assert.equal(numIslands([[]]), 0);
});
