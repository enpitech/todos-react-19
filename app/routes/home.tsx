// https://react.dev/blog/2024/04/25/react-19#whats-new-in-react-19
// Fetch todos ✅
// update todo ✅
// show completed todos ✅
// Race condition ✅
// Throw an error - what will happen? ✅
// startTransition ✅
// useTransition - supporting async and error boundary - https://react.dev/reference/react/useTransition# - ✅

// Create new Todo
// display error
// formAction
// useActionState - React query -> Meta frameworks -> Primitive! - https://react.dev/reference/react/useActionState#noun-labs-1201738-(2)
// return error
// loading state with useFormStatus
// Improve update UX/Performance
// useOptimistic - https://react.dev/reference/react/useOptimistic#noun-labs-1201738-(2)

// use + Suspense - https://react.dev/reference/react/use#noun-labs-1201738-(2)

// Meta tags - https://react.dev/reference/react-dom/components/meta#noun-labs-1201738-(2)
// Performance

import { useEffect, useState, useTransition } from "react";
import { Todo, type TodoProps } from "~/components/Todo";
import "../app.css";

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, startTransition] = useTransition();

  const fetchTodos = async () => {
    const response = await fetch("/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchTodos();
    });
  }, []);

  const handleStatusChange = async (id: number, status: boolean) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", String(id));
      formData.append("status", String(status));

      const response = await fetch(`/todos/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      await response.json();
      await fetchTodos();
    });
  };

  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <div className="App">
      <div className="status-indicator">{loading && <pre>Loading..</pre>}</div>
      <div className="Todos">
        <div>Completed Todos: {completed}</div>
        <form>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                {...todo}
                onStatusChange={handleStatusChange}
              />
            );
          })}
        </form>
      </div>
    </div>
  );
}
