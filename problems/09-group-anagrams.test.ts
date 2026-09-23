/**
 * Group Anagrams.  —  hash map + counting
 *
 * Group the strings so that every anagram sits together. Order of groups, and
 * order inside a group, does not matter; the tests normalise both.
 *
 * Two strings are anagrams when they contain the same characters with the same
 * frequencies. The whole problem is the key you put in the map: it must be
 * identical for two anagrams and different for everything else. Be ready to
 * name two keys and their costs — that is the follow-up, not the grouping loop.
 *
 * O(n · k) or O(n · k log k), depending on the key. n = number of strings,
 * k = length of the longest one.
 *
 * Say the approach, and the key, before you type.
 */

export function groupAnagrams(strs: string[]): string[][] {
  // The empty and single-element cases fall out of the loop. No special return
  // is required; an empty map's values are [].
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Key 1, the one you wrote: sorted characters. Identical iff anagrams.
    // Cost: O(k log k) per string. Fine to ship; name the alternative unprompted.
    //
    // Key 2, the follow-up: a count of 26 letters, e.g. counts.join(",") or a
    // tuple. O(k) per string, so total O(n · k) instead of O(n · k log k).
    // Same grouping loop either way — only the key changes.
    const key = [...str].sort().join("");

    // Push into the existing array. Do not `[...(map.get(key) ?? []), str]`:
    // that copies the whole group on every insert, O(group size) each time,
    // O(n²) if every string is an anagram of the others.
    let group = map.get(key);
    if (!group) {
      group = [];
      map.set(key, group);
    }
    group.push(str);
  }

  // O(n · k log k) time with the sorted key, O(n · k) extra space for the groups.
  // `[...map.values()]` materialises the iterator; order of groups does not matter.
  return [...map.values()];
}

// ---------------------------------------------------------------------------

import assert from "node:assert/strict";
import { test } from "node:test";

/** Group order and word order inside a group are irrelevant. */
function normalise(groups: string[][]): string {
  return JSON.stringify(
    groups
      .map((g) => [...g].sort())
      .sort((a, b) => (a[0] ?? "").localeCompare(b[0] ?? "")),
  );
}

test("the standard case", () => {
  assert.equal(
    normalise(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])),
    normalise([["bat"], ["eat", "tea", "ate"], ["tan", "nat"]]),
  );
});

test("identical strings are anagrams of each other", () => {
  assert.equal(normalise(groupAnagrams(["a", "a"])), normalise([["a", "a"]]));
  assert.equal(
    normalise(groupAnagrams(["", "", "a"])),
    normalise([["", ""], ["a"]]),
  );
});

test("edges", () => {
  assert.deepEqual(groupAnagrams([]), []);
  assert.equal(normalise(groupAnagrams(["x"])), normalise([["x"]]));
  assert.equal(
    normalise(groupAnagrams(["abc", "cba", "xyz"])),
    normalise([["abc", "cba"], ["xyz"]]),
  );
});
