# Frontend screen drills (Atlassian / Karat-style)

Vanilla HTML, CSS, and JavaScript only. Open a file in the browser; there is no build.

**Sandbox (three files, IntelliSense off):** File → Open Folder → `frontend/sandbox`, then Reload Window. Open `index.html` in Chrome.

    frontend/sandbox/index.html
    frontend/sandbox/styles.css
    frontend/sandbox/app.js

Machinify elevator (state machine, not a widget) lives next door:

    open ../machinify/elevator.html
    npm run drill 35

Older single-file drills (01–02 done; 03–07 are stubs — CSS + JS in the same file):

    open 00-time.html
    open 01-search-widget.html         # done
    open 02-paginated-fetch.html       # done
    open 03-bar-chart.html             # 60 min — heights in %, tooltip, sort
    open 04-data-table.html            # 60 min — sort, filter, selected row
    open 05-tabs-accordion.html        # 45 min — tabs + FAQ accordion
    open 06-modal-form.html            # 60 min — overlay, focus, validate
    open 07-file-tree.html             # 60 min — nested list, expand/collapse
    open 08-promises.html              # 45 min — all vs allSettled, retry, no unhandled rejection
    open 09-debounce-throttle.html     # 45 min — debounce search, throttle scroll, prove with counters
    open 10-carousel.html              # 45 min — one visible slide, wrap, dots, arrow keys, no autoplay
    open 11-tic-tac-toe.html           # 45 min — 3x3, win/draw, reset, one render()
    open 12-hangman.html               # 45 min — word mask, A–Z keys, 6 misses, new word

Full protocol, trivia, and CSS snippets:
`~/dev/job-search-2026/prep/atlassian-frontend-coding.md`

Same habits as Week 1: say the approach before typing, timer on, no React. If you are
stuck more than ten minutes, ask in the interview-prep chat.
