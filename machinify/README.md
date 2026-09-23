# Machinify — elevator (Revin)

Sunday 13 practice for Monday’s programming hour. Vanilla JS in the browser.
No imports, no AI, no React.

    open elevator.html

Then from this repo root:

    npm run drill 35

Their Monday editor, API, and requirement list will differ. Do not paste this
file into the interview. The habit is the point: read the API, restate part 1,
smallest change per new requirement, talk, cleanup.

`frontend/` is UI widgets. This hour is a **state machine**.

## Clock (45)

| Min | You |
| --- | --- |
| 0–4 | Read the provided API. Restate: one car, one request, what “done” looks like. |
| 4–25 | `request` + `tick`: move one floor toward the head of a queue. |
| 25–35 | If a new request is **on the way**, stop there first. Say the starve tradeoff. |
| 35–45 | Cleanup. Then read the Claude comment at the bottom of the HTML. One praise, one real bug. |

Unfinished-but-clear on the current requirement beats SCAN / LOOK / A*.

## Do not

- Import a library or start a class hierarchy.
- Jump more than one floor per tick (the API is the hardware).
- Recite Revin’s public stack.
- Look at the Claude comment before minute 35.
