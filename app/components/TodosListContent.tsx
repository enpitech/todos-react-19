"use client";

import { use } from "react";
import type { TodoData } from "~/routes/home";
import { Todo } from "./Todo";

export const TodosListContent = ({
  todosPromise,
}: {
  todosPromise: Promise<TodoData[]>;
}) => {
  const todos = use(todosPromise);
  return (
    <form>
      {todos.map((todo: TodoData) => {
        return (
          <Todo
            key={todo.id}
            {...todo}
            onStatusChange={async (id, status) => {}}
          />
        );
      })}
    </form>
  );
};
