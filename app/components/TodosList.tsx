import { sleep } from "~/utils";
import { TodosListContent } from "./TodosListContent";
import { Suspense } from "react";
import { AddNewTodo } from "./AddNewTodo";
import Spinner from "./Spinner";

export const TodosList = async () => {
  const todosResponse = fetch("http://localhost:5173/todos").then((response) =>
    sleep(2000).then(() => response.json()),
  );

  return (
    <div className="Todos">
      <Suspense
        fallback={
          <div className="text-center">
            {" "}
            <Spinner size="small" /> Loading...
          </div>
        }
      >
        <TodosListContent todosPromise={todosResponse} />
      </Suspense>
      <AddNewTodo />
    </div>
  );
};
