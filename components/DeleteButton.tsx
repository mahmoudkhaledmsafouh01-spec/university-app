// components/DeleteButton.tsx
"use client";

import React from "react";

type DeleteButtonProps = {
  apiUrl: string;   // es: "/api/users"
  id: number;       // id del record da cancellare
  onDeleted?: () => void;
};

export default function DeleteButton({ apiUrl, id, onDeleted }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare?")) return;

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (onDeleted) {
      onDeleted();
    } else {
      // fallback: ricarica pagina
      window.location.reload();
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="px-3 py-1 bg-red-600 text-white rounded"
    >
      Delete
    </button>
  );
}
