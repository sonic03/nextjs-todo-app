"use client";
import TodoAdd from "../components/TodoAdd";
import GetAllTodos from "../components/GetAllTodos";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo Uygulaması</h1>
      <TodoAdd />
      <GetAllTodos />
    </main>
  );
}
