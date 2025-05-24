// use + Suspense - https://react.dev/reference/react/use#noun-labs-1201738-(2)

// Meta tags - https://react.dev/reference/react-dom/components/meta#noun-labs-1201738-(2)
// Performance - preFetchDNS, preconnect, preinit, preInitModule, preload, preloadModule

import { Todo } from "~/components/Todo";
import "../app.css";
import { sleep } from "~/utils";
import { Suspense, use } from "react";
import Spinner from "~/components/Spinner";
import { ErrorBoundary } from "react-error-boundary";

export type TodoData = {
  task: string;
  completed: boolean;
  id: number;
};

const TODOS = [
  { task: "Walk the dog", completed: false, id: 1 },
  { task: "Do dishes", completed: false, id: 2 },
  { task: "Learn about React 19", completed: true, id: 3 },
];

export const loader = async () => {
  return {
    todos: await new Promise(async (resolve, reject) => {
      await sleep(1000);
      resolve(TODOS);
    }),
    moreTodos: await new Promise(async (resolve, reject) => {
      await sleep(4000);
      // reject("Error loading todos");
      // return;
      resolve(TODOS);
    }),
  };
};

export default function Home({
  loaderData,
}: {
  loaderData: { todos: TodoData[]; moreTodos: Promise<TodoData[]> };
}) {
  const { todos, moreTodos } = loaderData;

  return (
    <div className="App">
      <div className="Todos">
        {todos.map((todo) => {
          return <Todo key={todo.id} {...todo} onStatusChange={() => {}} />;
        })}
      </div>
    </div>
  );
}

// function AsyncTodos({ todosPromise }: { todosPromise: Promise<TodoData[]> }) {
//   const todos = use(todosPromise) as TodoData[];

//   return <Todos todos={todos} />;
// }

// function Todos({ todos }: { todos: TodoData[] }) {
//   return (
//     <>
//       {todos.map((todo) => {
//         return <Todo key={todo.id} {...todo} onStatusChange={() => {}} />;
//       })}
//     </>
//   );
// }

{
  /* <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<Spinner color="primary" />}>
            <AsyncTodos todosPromise={moreTodos} />
          </Suspense>
        </ErrorBoundary> */
}
