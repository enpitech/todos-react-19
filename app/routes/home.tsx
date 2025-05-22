// https://react.dev/blog/2024/04/25/react-19#whats-new-in-react-19
// Fetch todos ✅
// update todo ✅
// show completed todos ✅
// Race condition ✅
// Throw an error - what will happen? ✅
// startTransition ✅
// useTransition - supporting async and error boundary - https://react.dev/reference/react/useTransition# - ✅

// Create new Todo - ✅
// display error - ✅
// formAction - ✅
// useActionState - React query -> Meta frameworks -> Primitive! - https://react.dev/reference/react/useActionState#noun-labs-1201738-(2) - ✅
// return error - ✅
// loading state with useFormStatus - ✅
// Improve update UX/Performance - ✅
// useOptimistic - https://react.dev/reference/react/useOptimistic#noun-labs-1201738-(2) - ✅

// use + Suspense - https://react.dev/reference/react/use#noun-labs-1201738-(2)

// Meta tags - https://react.dev/reference/react-dom/components/meta#noun-labs-1201738-(2)
// Performance

import {
  useActionState,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Todo, type TodoProps } from "~/components/Todo";
import "../app.css";
import { useFormStatus } from "react-dom";

export default function Home() {
  const [todos, setTodos] = useState<Omit<TodoProps, "onStatusChange">[]>([]);
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

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

  const [error, createTodoAction, updating] = useActionState(
    async (prevState: any, formData: any) => {
      const response = await fetch("/todos", {
        method: "PATCH",
        body: formData,
      });

      setOptimisticTodos((prevTodos) => {
        const task = formData.get("task");
        const todo = {
          task,
          completed: false,
          id: prevTodos.length + 1,
        };
        return [...prevTodos, todo];
      });
      if (!response.ok) {
        return "Failed to create todo";
      }
      startTransition(fetchTodos);
    },
    null
  );

  return (
    <div className="App">
      <div className="status-indicator">
        <div>
          {loading && <pre>Loading..</pre>}
          {updating && <pre>Updating..</pre>}
        </div>
      </div>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      <div className="Todos">
        <div>Completed Todos: {completed}</div>
        <form action={createTodoAction}>
          {optimisticTodos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                {...todo}
                onStatusChange={handleStatusChange}
              />
            );
          })}
          <div className="flex">
            <input type="text" name="task" placeholder="Add a new todo" />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </button>
  );
}

// Fetch todos

// useEffect(() => {
//     const fetchTodos = async () => {
//       const response = await fetch("/todos");
//       if (!response.ok) {
//         throw new Error("Failed to fetch todos");
//       }
//       const data = await response.json();
//       setTodos(data);
//     };
//     fetchTodos().catch((error) => {
//       console.error("Error fetching todos:", error);
//     });
//   }, []);

// Updating todos

// const handleStatusChange = async (id: number, status: boolean) => {
//   setLoading(true);
//   const formData = new FormData();
//   formData.append("id", String(id));
//   formData.append("status", String(status));

//   const response = await fetch(`/todos/${id}`, {
//     method: "PATCH",
//     body: formData,
//   });
//   if (!response.ok) {
//     throw new Error("Failed to update todo");
//   }
//   await response.json();
//   await fetchTodos();
//   setLoading(false);
// };

// Create todo onSubmit

// onSubmit={async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.currentTarget);

//   const response = await fetch("/todos", {
//     method: "PATCH",
//     body: formData,
//   });

//   if (!response.ok) {
//     setError("Failed to create todo");
//   }
//   (e.target as HTMLFormElement).reset();
//   fetchTodos();
// }}

// Create todo action
// action={async (formData) => {
//   const response = await fetch("/todos", {
//     method: "PATCH",
//     body: formData,
//   });

//   if (!response.ok) {
//     setError("Failed to create todo");
//     return;
//   }
//   fetchTodos();
// }}
