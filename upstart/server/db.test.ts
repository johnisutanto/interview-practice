import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";
import { createItem, listItems, openDatabase } from "./db.ts";

const dir = mkdtempSync(path.join(tmpdir(), "upstart-db-"));
const db = openDatabase(path.join(dir, "test.sqlite"));

after(() => {
  db.close();
  rmSync(dir, { recursive: true, force: true });
});

describe("items", () => {
  it("inserts a row and reads it back", () => {
    const created = createItem(db, "Roof", "Needs a quote");
    const [first] = listItems(db);
    assert.equal(first?.id, created.id);
    assert.equal(first?.title, "Roof");
    assert.equal(first?.details, "Needs a quote");
  });

  it("refuses a blank title", () => {
    assert.throws(() => createItem(db, "", "nope"));
  });
});
