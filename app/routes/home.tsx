// https://react.dev/blog/2024/04/25/react-19#whats-new-in-react-19
// Fetch todos
// update todo
// Race condition
// Throw an error - what will happen?
// startTransition
// Throw an error - what will happen?
// useTransition - supporting async and error boundary - https://react.dev/reference/react/useTransition#
// Throw an error - what will happen?

// Create new Todo
// display error
// formAction
// useActionState - React query -> Meta frameworks -> Primitive! - https://react.dev/reference/react/useActionState#noun-labs-1201738-(2)
// throw/return error
// loading state with useFormStatus
// Improve update UX/Performance
// useOptimistic - https://react.dev/reference/react/useOptimistic#noun-labs-1201738-(2)

// use + Suspense - https://react.dev/reference/react/use#noun-labs-1201738-(2)

// Meta tags - https://react.dev/reference/react-dom/components/meta#noun-labs-1201738-(2)
// Performance - preFetchDNS, preconnect, preinit, preInitModule, preload, preloadModule

// /todos - GET - get todos
// /todos - PATCH - update todo
// /todos - POST - new todo

import { useState } from "react";
import { Todo } from "~/components/Todo";

export type TodoData = {
  task: string;
  completed: boolean;
  id: number;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoData[]>([]);

  return (
    <div className="App">
      <div className="Todos">
        <form>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                {...todo}
                onStatusChange={async (id, status) => {}}
              />
            );
          })}
        </form>
      </div>
    </div>
  );
}

// Fetch todos

// useEffect(() => {
//     setError("");
//     setLoading(true);
//     fetch("/todos")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch todos");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setTodos(data);
//         setLoading(false);
//       })
//       .catch((e) => setError(e.toString()))
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

// Update todo

// async (id, status) => {
//                   const formData = new FormData();
//                   formData.set("id", String(id));
//                   formData.set("status", String(status));
//                   setLoading(true);
//                   const response = await fetch("/todos", {
//                     method: "PATCH",
//                     body: formData,
//                   });
//                   if (!response.ok) {
//                     throw new Error("Failed to update todo");
//                   }
//                   await fetchTodos();
//                   setLoading(false);
//                 }}

// Race condition

// const completed = todos.filter((todo) => todo.completed).length;
// <div>Completed Todos: {completed}</div>

// startTransition
// startTransition(async () => {
//                     const formData = new FormData();
//                     formData.set("id", String(id));
//                     formData.set("status", String(status));
//                     const response = await fetch("/todos", {
//                       method: "PATCH",
//                       body: formData,
//                     });
//                     if (!response.ok) {
//                       throw new Error("Failed to update todo");
//                     }
//                     await fetchTodos();
//                   });

// Create new todo and display error (onSubmit)
// (e) =>
//             startTransition(async () => {
//               e.preventDefault();
//               const formData = new FormData(e.target as HTMLFormElement);
//               const response = await fetch("/todos", {
//                 method: "POST",
//                 body: formData,
//               });
//               if (!response.ok) {
//                 throw new Error("Could not create todo");
//               }
//               await fetchTodos();
//               (e.target as HTMLFormElement).reset();
//             })

// Create new todo - form action
// const createTodoAction = (formData: FormData) => {
//     startTransition(async () => {
//       const response = await fetch("/todos", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Could not create todo");
//       }
//       await fetchTodos();
//     });
//   };

// Create new todo - useActionState
// const [createError, createTodoAction, updating] = useActionState(
//   async (prevState: any, formData: FormData) => {
//     const response = await fetch("/todos", {
//       method: "POST",
//       body: formData,
//     });
//     if (!response.ok) {
//       // throw new Error("Could not create todo");
//       return "Could not create todo";
//     }
//     await fetchTodos();
//   },
//   null
// );

// useFormStatus
// function SubmitButton({ text }: { text: string }) {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending}>
//       {text}
//     </button>
//   );
// }

// Optimistic - onSubmit
// (e) => {
//             setTodos((prevTodos) => {
//               return [
//                 ...prevTodos,
//                 {
//                   id: prevTodos.length + 1,
//                   completed: false,
//                   task: new FormData(e.target as HTMLFormElement).get(
//                     "task"
//                   ) as string,
//                 },
//               ];
//             });
//           }

// Optimistic - useOptimistic
// setOptimisticTodos((prevTodos) => {
//         return [
//           ...prevTodos,
//           {
//             id: prevTodos.length + 1,
//             completed: false,
//             task: formData.get("task") as string,
//           },
//         ];
//       });
