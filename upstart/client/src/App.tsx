import { SubmitEvent, useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
  details: string;
  createdAt: string;
};

export function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function load() {
    const response = await fetch("/api/items");
    if (!response.ok) throw new Error("Could not load items");
    setItems((await response.json()) as Item[]);
  }

  useEffect(() => {
    load().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Could not load items");
    });
  }, []);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not save");
      }
      setTitle("");
      setDetails("");
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setPending(false);
    }
  }

  return (
    <main>
      <h1>Items</h1>
      <p className="lede">A page, a form, and a row in SQLite. Change the shape when the prompt arrives.</p>

      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          Details
          <textarea
            name="details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={3}
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
        {error ? <p className="error">{error}</p> : null}
      </form>

      {items.length === 0 ? (
        <p>Nothing saved yet.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              {item.details ? <span>{item.details}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
