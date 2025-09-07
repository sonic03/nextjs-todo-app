"use client";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import GetTodo from "./GetTodo";

export default function TodoList() {
  const { todos, fetchTodos, loading, error } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mtop">
      <div className="flex gap-4">

        <div className="w-full md:w-1/2">
        <div className="w-full md:w-1/2 px-2 mb-4 bg-blue-200 p-4">
          <span className="not-done" >TAMAMLANMAYANLAR</span>
        </div>
          
          {todos.length === 0 ? <li className="p-2">Henüz görev yok.</li> :
          todos.map(t => t.status == false && <GetTodo key={t.id} id={t.id} todo={t} />)}
        </div> 
        <div className="w-full md:w-1/2">
        <span className="done">TAMAMLANANLAR</span>
          {todos.length === 0 ? <li className="p-2">Henüz görev yok.</li> :
          todos.map(t => t.status == true && <GetTodo key={t.id} id={t.id} todo={t} />)}
        </div> 
      </div> 
      
      
      
    </div>
    
  );
}
