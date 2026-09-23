# Vanilla HTML / CSS / JS sandbox

Three files, no build, no framework.

    index.html
    styles.css
    app.js

## Open this folder, not the parent

File → Open Folder → `~/dev/interview-practice/frontend/sandbox`

Then Command Palette → **Developer: Reload Window**. IntelliSense and Cursor Tab
settings live in `.vscode/settings.json` here and only apply when this folder is
the workspace root.

Check: in `index.html` type `<d` — no ghost tag, no Emmet expansion. In the
browser, open `index.html` (double-click, or drag onto Chrome). You should see
the current time. That is Atlassian’s environment check.

## Edit and refresh

Change a file, save, then reload the Chrome tab. There is no live server on
purpose — Karat is click-Run too.

Chat in other Cursor windows is unaffected. Do not use Cmd+K or Agent in this
window while you are timing a drill.
