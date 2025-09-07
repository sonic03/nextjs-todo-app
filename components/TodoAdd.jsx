"use client";
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = useTodoStore(s => s.addTodo);

  const submit = e => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addTodo(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 mb-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Başlık" 
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Açıklama"
        className="border p-2 rounded input-primary"
      />
      <button type="submit" className="btn-add">
        Ekle
      </button>
    </form>
  );
}
