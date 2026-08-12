# Recap — enough to start Days 1–2

Read this once, then close it. The problems teach the rest. This is not a solutions
guide: if a sentence starts to look like an implementation, stop and go write code.

## Complexity, said out loud

Interviewers want this without being asked. The vocabulary is small.

| You say | It means | Typical cause |
| --- | --- | --- |
| O(1) | constant, independent of input size | a few variables, array index |
| O(n) | one pass, or a few passes | a `for` over the array |
| O(n log n) | sort, then linear work | `nums.sort(...)` then a scan |
| O(n²) | nested loops over n | 3Sum after the sort |
| O(n) extra space | a map or a second array that grows with n | hash map of seen values |
| O(1) extra space | a handful of pointers and counters | two indices `left` and `right` |

The output array usually does not count as extra space. If the problem says "O(1)
extra", it means besides the answer you return.

When you finish, say it as one sentence: "This is O(n) time and O(1) extra space
because I walk the array once and keep two indices."

---

## TypeScript 101 for these eight files

You already write TypeScript at work. What rusts is the small surface these problems
use, plus a few interview-only habits.

### Types you will see in the stubs

```ts
nums: number[]                          // array of numbers
s: string                               // string, indexable like an array
k: number
[number, number] | null                 // a pair, or nothing
number[][]                              // array of arrays (triplets)
```

`| null` means "this or nothing". Return `null` when there is no answer, not `undefined`
and not `[]`, unless the stub says otherwise.

### Arrays

```ts
nums.length                  // length
nums[i]                      // element at i, 0-based
nums[i]!                     // "I know this is defined" — use after a bounds check
const a = [...nums]          // shallow copy, so sort does not mutate the input
a.sort((x, y) => x - y)      // numeric ascending. Default sort is lexicographic: [1, 10, 2]
```

Default `sort()` on numbers is a trap. Always pass `(x, y) => x - y`.

```ts
const out: number[] = []
out.push(x)

const seen = new Array(n).fill(1)       // n slots, each 1
```

### Strings

```ts
s.length
s[i]                         // character at i (a string of length 1)
s.slice(start, end)          // substring, end exclusive
for (const c of s) { ... }   // each character
```

There is no separate `char` type. A character is a string.

### Map and Set — the hash table

```ts
const last = new Map<string, number>()
last.set(c, i)
last.get(c)                  // number | undefined
last.has(c)

const count = new Map<string, number>()
count.set(c, (count.get(c) ?? 0) + 1)   // increment, treating missing as 0
```

`??` is "if null or undefined, use this instead". `||` also works for 0-defaults but
treats `0` as missing, which is wrong when 0 is a real count. Prefer `??`.

```ts
const seen = new Set<number>()
seen.add(x)
seen.has(x)
```

### Loops and pointers

```ts
let left = 0
let right = nums.length - 1
while (left < right) {
  // look at nums[left] and nums[right]
  // then left++ or right--
}

for (let i = 0; i < nums.length; i++) { ... }
```

`i++` and `++i` are the same when they stand alone. `left++` means "use left, then add 1".

### Returning early

```ts
if (t === "" || s.length < t.length) return ""
if (nums.length < 2) return null
```

Handle empty input first. The tests include `[]` and `""` on purpose.

### What you do not need

Generics beyond `Map<string, number>`. Classes. `interface`. Async. Modules other than
the `export function` already in the stub. If you find yourself reaching for those, you
are overcomplicating it.

---

## The four patterns

Every problem this week is one of these. The skill is recognising which, then executing
it, not inventing a new algorithm.

### 1. Two pointers

**Picture.** Two indices on a sorted array, usually at the ends, walking toward each
other.

```
  left →              ← right
[  -2,  0,  1,  3,  7 ]
```

**When.** The array is sorted, or you can sort it first, and you are looking for a pair
(or a pair inside a loop) that satisfies a sum or a width.

**The move.** Compare the current pair to the goal. If the sum is too small, the only
way to get bigger is to move the left pointer right (larger value). If too big, move
the right pointer left. Each step discards one index forever, so the loop is O(n).

**The thing you must be able to say.** Why moving the *other* pointer cannot help. If
you cannot justify the move, you do not have the algorithm yet — you have a guess.

**Watch for.** Off-by-one when `left === right` (that is one element, not a pair).
Mutating the input by sorting in place when the caller still needs the original order
— copy first if you need original indices.

**Problems:** 01, 02, 03.

### 2. Sliding window

**Picture.** A subarray (or substring) defined by `left` and `right`. `right` walks
forward and the window grows. When the window becomes invalid, `left` walks forward
and it shrinks. Every element enters once and leaves once: O(n).

```
s = a  b  c  a  b  c  b  b
        [left .... right]
```

**When.** You want the longest / shortest / best contiguous span that satisfies a
constraint: no repeats, at most k changes, contains all of t, and so on.

**The invariant.** After each step the window is the best one that *ends at `right`*.
You do not restart from scratch; you repair.

**The two flavours.**

- *Grow until invalid, then shrink until valid again* — typical for "longest".
- *Grow until valid, then shrink while it stays valid* — typical for "shortest".
  Problem 06 is this one.

**Cheap validity.** Do not rescan the window to ask "am I still valid?". Keep a
counter, a map of counts, or a "how many constraints are still unsatisfied" integer,
and update it in O(1) when an element enters or leaves.

**The classic bug.** You find a previous occurrence of a character and jump `left`
there, but that previous occurrence is *already left of the window*. Always take
`max(left, previous + 1)`, or only update `left` when the previous index is still
inside. Problem 04's tests `"abba"` and `"dvdf"` exist to catch this.

**Problems:** 04, 05, 06.

### 3. Prefix sums (and the hash map)

**Picture.** `prefix[i]` is the sum of everything before index i (or through i —
pick one and stick to it). Then the sum of `nums[l..r]` is `prefix[r+1] - prefix[l]`.

You rarely store the whole prefix array. You keep a running `sum` and a map of
*how many times each prefix value has appeared so far*.

**When.** "How many subarrays sum to k", "does any subarray sum to k", anything
about a range sum that must be O(n). Especially when values can be **negative**.

**Why the window fails here.** A sliding window assumes that growing the window
makes the quantity monotonic — bigger, or more unique characters, or more of t.
A negative number makes the sum smaller as the window grows. There is no safe
"this is too big, shrink left" rule. That is the sentence to say on problem 07.

**The seed.** Before you see any element, the prefix sum is 0, and you have seen
it once. Without that entry, a subarray that starts at index 0 is invisible.

**Problems:** 07. (08 is the same idea with products instead of sums.)

### 4. Prefix and suffix products

**Picture.** `result[i]` needs everyone except `nums[i]`. That is "product of
everything to the left" times "product of everything to the right".

Two passes: left-to-right filling prefixes, right-to-left multiplying suffixes.
The output array holds the prefixes, then gets overwritten in the second pass,
so extra space is O(1).

**Why no division.** Zeros. Division by zero is undefined, and a single zero
means every other slot is 0 while the zero's own slot is the product of the
rest. Two zeros mean everything is 0. Prefix/suffix handles this without a
special case, which is why the constraint exists.

**Problems:** 08.

---

## How the eight connect

```
01 two pointers on a sorted pair
        ↓ same move, different comparison
02 two pointers, justify which end moves
        ↓ wrap the pair in an outer loop, skip duplicates
03 3Sum
        ↓ contiguous, so pointers become a window
04 longest window with a uniqueness constraint
        ↓ same window, now a count / budget k
05 longest window with a replacement budget
        ↓ same window, shrink while valid (shortest, not longest)
06 minimum window covering t
        ↓ contiguous sums, but negatives kill the window
07 prefix sums + map  (say why 04–06 cannot do this)
        ↓ same two-pass idea, products not sums
08 prefix × suffix
```

---

## What to say before you type (template)

1. **Restate** the input, the output, and one example in one sentence.
2. **Brute force** in one sentence, with its complexity, so they know you see it.
3. **The pattern** and why it applies ("sorted, so two pointers", "contiguous, so
   a window", "negatives, so not a window").
4. **Complexity** of the approach you are about to write.
5. Then type.

If you skip 1–4 you will start coding the first idea that occurs to you, which is
usually the O(n²) one.

---

## Off-by-one checklist

These eat more interview time than algorithms do.

- Indices are 0-based. `nums[nums.length - 1]` is the last element.
- `slice(start, end)` does not include `end`.
- A window from `left` to `right` inclusive has length `right - left + 1`.
- `while (left < right)` is a pair. `while (left <= right)` includes a single element.
- After `left++`, `nums[left]` is the *new* left, not the one you just processed.

Walk one example on paper (or out loud) before claiming you are done. The timer's
85% checkpoint exists for this.

---

## If you want more depth (video, animation, interactive)

Watch *pattern* explanations, not solutions to 01–08, until you have attempted those
files. Seeing the answer first is how the unaided week stops being unaided.

### Algorithms — start here

1. **[NeetCode](https://neetcode.io/)** — the one that matches this recap. Open the
   roadmap, stay in **Two Pointers** then **Sliding Window**. Each problem has a
   short video that draws the pointers moving. The free [Two Pointers playlist](https://www.youtube.com/playlist?list=PLALUz6Z8Un2dnwTPrQ5F2NbmFjuK_r6zH)
   and the [Roadmap playlist](https://www.youtube.com/playlist?list=PLEN28aeGPfN_nhXftwe_RTkoOuSj5ntZo)
   are the same content on YouTube. Watch the intro / first easy video in each
   section; skip the videos for problems you are about to solve here.

2. **[Hello Algo](https://www.hello-algo.com/en/)** — a free book of ~500 animated
   illustrations with runnable TypeScript. Best if you want to sit and *see* arrays,
   two pointers, and complexity rather than grind problems. Start at
   [Complexity Analysis](https://www.hello-algo.com/en/chapter_computational_complexity/time_complexity/)
   then the array chapter.

3. **Step-through visualizers** (click Next, watch L and R move):
   - [Two pointers — pair sum and container area](https://ravensmove.com/tools/two-pointers-visualizer)
     (problems 01 and 02)
   - [Sliding window — fixed, variable, and at-most-k](https://leetcopilot.dev/tool/sliding-window-visualizer)
     (problems 04, 05, 06)

[VisuAlgo](https://visualgo.net/en/array) is excellent later this week for sorting
and binary search. It is weaker on sliding window specifically, so skip it today.

### TypeScript — you already write this at work

You do not need a course. You need the interview-sized surface (arrays, Map, `??`,
numeric `sort`) to feel automatic again.

1. **[TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)**
   then click around in the **[Playground](https://www.typescriptlang.org/play)**.
   Hover a variable to see the inferred type. That hover is the whole skill.
2. If you want interactive exercises rather than a handbook:
   **[Total TypeScript — beginners tutorial](https://www.totaltypescript.com/tutorials/beginners-typescript)**
   (Matt Pocock). Do the first handful of exercises; stop before it becomes a type-system
   deep dive. You will not be asked to write conditional types in a coding screen.

### A two-hour review, if you want a plan

| Time | What |
| --- | --- |
| 25 min | Hello Algo complexity + array chapter (animations) |
| 20 min | Two-pointers visualizer, pair-sum then container-area modes |
| 20 min | Sliding-window visualizer, variable-size then at-most-k |
| 20 min | One NeetCode *intro* video for two pointers, one for sliding window |
| 15 min | TypeScript playground: `Map`, `??`, `[...nums].sort((a,b) => a-b)` |
| rest | Close the tabs. Open problem 01. |
