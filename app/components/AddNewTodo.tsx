"use client";
import { useActionState, useOptimistic } from "react";
import { addNewTodo } from "~/actions/addNewTodo";
import type { TodoData } from "~/routes/home";
import { TODOS } from "~/routes/todos";
import { Todo } from "./Todo";
import Spinner from "./Spinner";

export const AddNewTodo = ({}) => {
  const [optimisticTodo, addOptimisticTodo] = useOptimistic<
    TodoData | undefined
  >(undefined);

  const [, action, isPending] = useActionState(
    (_prevState: unknown, formData: FormData) => {
      addOptimisticTodo({
        task: formData.get("task") as string,
        completed: false,
        id: TODOS.length + 1,
      });

      addNewTodo(formData);
    },
    undefined,
  );

  return (
    <>
      <div className="animate-pulse">
        {optimisticTodo && (
          <Todo {...optimisticTodo} onStatusChange={() => {}} />
        )}
      </div>
      <form action={action}>
        <input type="text" name="task" />
        <button type="submit" disabled={isPending}>
          {isPending && <Spinner size="small" color="secondary" />}
          Add
        </button>
      </form>
    </>
  );
};
