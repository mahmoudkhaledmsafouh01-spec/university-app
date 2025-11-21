"use client";

export default function Error({ error }: { error: Error }) {
  console.error(error);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "red" }}>Errore</h1>
      <p>{error.message}</p>
    </div>
  );
}
