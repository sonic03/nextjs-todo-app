"use client";
import { useTodoStore } from "../store/useTodoStore";

export default function GetTodo({ todo }) {
  const toggleTodo = useTodoStore(s => s.toggleTodo);
  const deleteTodo = useTodoStore(s => s.deleteTodo);

  return (
    
      <div className="w-full md:w-1/2 px-2 mb-4 bg-blue-200 p-4">
        <div className={todo.status ? "card-inner card-done" : "card-inner"}>
          <h5 className="card-title">Task Başlığı: {todo.title}</h5>
          <p className="card-desc"> Task Açıklaması: {todo.description}</p>
          <div className="button-area">
            <button id={todo.id}  onClick={() => toggleTodo(todo.id)} className="lower-button">{todo.status == true?"Tamamlanmadı":"Tamamlandı"}</button>
            <button onClick={() => deleteTodo(todo.id)} className="lower-button delete-button">Sil</button>
          </div>
          
        </div>
      </div>
      
    
  );
}
