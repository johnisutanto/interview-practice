#!/usr/bin/env node
/**
 * A visible clock, because the thing that goes wrong in a timed screen is losing
 * track of time, not losing track of the algorithm.
 *
 * The checkpoints are the actual failure modes: typing before saying anything,
 * silence in the middle, and running out of time with no verification done.
 *
 *   npm run drill            # 35 minutes, the standard screen length
 *   npm run drill 45         # longer format
 */

const minutes = Number(process.argv[2] ?? 35);
if (!Number.isFinite(minutes) || minutes <= 0) {
  console.error(`Bad duration '${process.argv[2]}'. Give a number of minutes.`);
  process.exit(1);
}

const totalMs = minutes * 60_000;
const started = Date.now();

/** Fractions of the way through, and what should already have happened by then. */
const CHECKPOINTS: Array<[fraction: number, note: string]> = [
  [0.1, "Approach should be stated out loud by now. If you are typing, you are early."],
  [0.3, "Skeleton should exist. Narrate what you are about to do next."],
  [0.6, "Should be filling in logic, not still designing. Say where you are."],
  [0.85, "Stop writing. Walk the code with an example, then state time and space."],
];

let fired = 0;

function clock(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

console.log(`\n  ${minutes} minutes. Say your approach before you type.\n`);

const tick = setInterval(() => {
  const elapsed = Date.now() - started;
  const remaining = totalMs - elapsed;

  if (fired < CHECKPOINTS.length && elapsed / totalMs >= CHECKPOINTS[fired]![0]) {
    process.stdout.write(`\r  ${clock(remaining)} left   ${CHECKPOINTS[fired]![1]}\n`);
    fired += 1;
  }

  if (remaining <= 0) {
    clearInterval(tick);
    process.stdout.write(`\r  time.                                                             \n\n`);
    console.log("  Before you look at anything: what would you have done differently?\n");
    process.exit(0);
  }

  process.stdout.write(`\r  ${clock(remaining)} left `);
}, 1000);
