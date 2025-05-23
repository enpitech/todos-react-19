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
  Suspense,
  use,
  useActionState,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Todo, type TodoProps } from "~/components/Todo";
import "../app.css";
import { useFormStatus } from "react-dom";
import { useNavigation, type ActionFunctionArgs } from "react-router";
import { sleep } from "~/utils";
import { ErrorBoundary } from "react-error-boundary";

const TODOS = [
  { task: "Walk the dog", completed: false, id: 1 },
  { task: "Do dishes", completed: false, id: 2 },
  { task: "Learn about React 19", completed: true, id: 3 },
];

export const loader = async () => {
  return {
    todos: await new Promise(async (resolve, reject) => {
      await sleep(1000);
      // reject("Error loading todos");
      resolve(TODOS);
    }),
    moreTodos: await new Promise(async (resolve, reject) => {
      await sleep(4000);
      resolve(TODOS);
    }),
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await sleep(1000);

  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const status = formData.get("status") === "true";

  if (id && status !== undefined) {
    const todoToUpdate = TODOS.find((todo) => {
      return todo.id === id;
    });
    if (!todoToUpdate) {
      throw new Response("Todo not found", { status: 404 });
    }
    todoToUpdate.completed = status;
  } else {
    // throw new Response("Invalid request", { status: 400 });
    const task = formData.get("task");
    if (typeof task !== "string" || !task) {
      throw new Response("Task is required", { status: 400 });
    }
    const todo = {
      task,
      completed: false,
      id: TODOS.length + 1,
    };
    TODOS.push(todo);
  }

  return {};
};

export default function Home({
  loaderData,
}: {
  loaderData: { todos: TodoProps[]; moreTodos: Promise<TodoProps[]> };
}) {
  const { todos, moreTodos } = loaderData;

  return (
    <div className="App">
      <div className="Todos">
        {todos.map((todo) => {
          return <Todo key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
}

// function AsyncTodos({ todosPromise }: { todosPromise: Promise<TodoProps[]> }) {
//   const todos = use(todosPromise) as TodoProps[];

//   return <Todos todos={todos} />;
// }

// function Todos({ todos }: { todos: TodoProps[] }) {
//   return (
//     <>
//       {todos.map((todo) => {
//         return <Todo key={todo.id} {...todo} />;
//       })}
//     </>
//   );
// }

// Previous functions

// const handleStatusChange = async (id: number, status: boolean) => {
//   startTransition(async () => {
//     const formData = new FormData();
//     formData.append("id", String(id));
//     formData.append("status", String(status));

//     const response = await fetch(`/todos/${id}`, {
//       method: "PATCH",
//       body: formData,
//     });
//     if (!response.ok) {
//       throw new Error("Failed to update todo");
//     }
//     await response.json();
//   });
// };

// const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

// const [error, createTodoAction, updating] = useActionState(
//   async (prevState: any, formData: any) => {
//     const response = await fetch("/home", {
//       method: "PATCH",
//       body: formData,
//     });

//     setOptimisticTodos((prevTodos) => {
//       const task = formData.get("task");
//       const todo = {
//         task,
//         completed: false,
//         id: prevTodos.length + 1,
//       };
//       return [...prevTodos, todo];
//     });
//     if (!response.ok) {
//       return "Failed to create todo";
//     }
//     // startTransition(fetchTodos);
//   },
//   null
// );

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending}>
//       {pending ? "Creating..." : "Create"}
//     </button>
//   );
// }
