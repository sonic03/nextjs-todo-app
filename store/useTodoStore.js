import { create } from "zustand";

const api = "/api/todos";

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(api);
      const data = await res.json();
      set({ todos: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTodo: async (title, description) => {
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg);
      }

      const newTodo = await res.json();
      set(state => ({ todos: [newTodo, ...state.todos] }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  toggleTodo: async (id) => {
      const todo = get().todos.find(t => t.id === id);
      if (!todo) return;

      try {
        const res = await fetch("/api/todos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: todo.id,               // string olduğundan emin ol
            updates: { status: !todo.status }
          })
        });

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg);
        }

        const updated = await res.json();
        set(state => ({
          todos: state.todos.map(t => t.id === id ? updated : t)
        }));
      } catch (err) {
        console.error("toggleTodo error:", err);
        set({ error: err.message });
      }
    },

  deleteTodo: async (id) => {
    try {
      await fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      set(state => ({ todos: state.todos.filter(t => t.id !== id) }));
    } catch (err) {
      set({ error: err.message });
    }
  }
}));
