# Practice rig

Throwaway repo. Nothing here is portfolio material and none of it should be pushed
anywhere public — problem solutions on a public profile are worth less than nothing.

Node 24 or newer, no dependencies, no build step.

    npm run drill            # start a visible 35-minute clock
    npm test                 # run everything
    node --test problems/04-longest-unique-substring.test.ts     # run one

Each problem is a single file: the stub at the top, the tests at the bottom. Open one
file, implement the function, run it. Every test currently fails with "not implemented",
which is the correct starting state.

## The protocol

The problems are the easy part. The habits are what the screen actually measures, and
they only become automatic by being practised deliberately, out loud, alone, feeling
slightly ridiculous.

**Say the approach before typing.** Every time, even alone. Silence while thinking reads
as being stuck, and this is the single most common reason a candidate who solved the
problem still fails the round. The timer's first checkpoint fires at 10% specifically to
catch you typing early.

**State time and space complexity without being asked.** Runtime analysis is one of the
areas interviewers deliberately lean on now, because it is hard to fake and hard to get
from a model without it being obvious.

**Talk while stuck, not after.** "I'm considering two options and here's the tradeoff" is
a strong signal. Ninety seconds of silence followed by a correct answer is a weak one.

**Verify with an example before saying you're done.** Walk the code with a concrete input,
out loud. The last checkpoint at 85% exists for this.

## Rules for these two days

No AI. Not for hints, not for syntax, not for "just checking my approach". Weeks 2 and 4
are where AI-assisted work gets practised properly, and mixing the two now means you learn
neither. This week is the unaided baseline, and you cannot know what to improve without it.

`.vscode/settings.json` disables Cursor Tab's ghost text for this folder only — other
projects and windows are unaffected, since workspace settings apply to their own folder.
Reload the window after opening, then confirm no ghost text appears before starting. Chat
and agents still work here; the discipline of not asking is yours, but the autocomplete
that would quietly hand you the answers is gone.

Screen record at least two sessions. Watch one back and note every place you went quiet
for more than ten seconds. That list is the actual weakness, and it will not match what
you think your weakness is.

If you are stuck for more than ten minutes, stop and ask me. Grinding a problem past that
point teaches frustration tolerance, not pattern recognition.

## Days 1–2 — arrays, two pointers, sliding window, prefix sums

Eight problems, ordered so each one leans on the last. Do them in order.

| # | Problem | Pattern |
| --- | --- | --- |
| 01 | Two Sum, sorted input | two pointers |
| 02 | Container With Most Water | two pointers, with a justification to defend |
| 03 | 3Sum | sort then two pointers, duplicate handling |
| 04 | Longest Substring Without Repeating Characters | sliding window |
| 05 | Longest Repeating Character Replacement | sliding window with counts |
| 06 | Minimum Window Substring | sliding window, hard |
| 07 | Subarray Sum Equals K | prefix sums, and why the window fails |
| 08 | Product of Array Except Self | prefix and suffix products |

06 is the one worth finishing properly if time runs short. 07 pairs with it deliberately:
being able to say *why* the window that solved 04 and 05 cannot solve 07 is a better
signal than solving either.

## Why TypeScript

Committed for six weeks, no splitting. The live Dropbox role is Senior Fullstack Product
Software Engineer on Web Experience, so a product-shaped TypeScript loop is the thing to
be fluent in. Algorithm reps are the warm-up rather than the destination — expect that
loop to lean toward practical component, state and API work.
