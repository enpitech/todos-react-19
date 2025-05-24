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
// Performance - preFetchDNS, preconnect, preinit, preInitModule, preload, preloadModule

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
