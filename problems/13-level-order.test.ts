/**
 * Binary Tree Level Order Traversal.  —  BFS
 *
 * Return the values of each level, top to bottom, left to right.
 * Empty tree returns [].
 *
 * BFS uses a queue. The trick that makes *levels* fall out is: at the start of
 * each round, `queue.length` is the size of this level — drain exactly that many
 * nodes, enqueue their children, and that batch is the next level.
 *
 * DFS can also group by depth, but interviewers want the queue version here.
 * Say "queue, and I snapshot the length" before you type.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function levelOrder(root: TreeNode | null): number[][] {
  throw new Error("not implemented");
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

test("the standard tree", () => {
  const root = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7)),
  );
  assert.deepEqual(levelOrder(root), [[3], [9, 20], [15, 7]]);
});

test("left-skewed", () => {
  const root = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
  assert.deepEqual(levelOrder(root), [[1], [2], [3]]);
});

test("edges", () => {
  assert.deepEqual(levelOrder(null), []);
  assert.deepEqual(levelOrder(new TreeNode(1)), [[1]]);
});
