"use client";
import { useActionState, useEffect, useOptimistic, useState } from "react";
import { addNewTodo } from "~/actions/addNewTodo";
import type { TodoData } from "~/routes/home";
import { Todo } from "./Todo";
import Spinner from "./Spinner";
import { Button } from "./ui/Button";

export const AddNewTodo = ({}) => {
  const [optimisticTodo, addOptimisticTodo] = useOptimistic<
    TodoData | undefined
  >(undefined);
  const [responseText, setResponseText] = useState<string | undefined>(
    undefined,
  );

  const [, action, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      addOptimisticTodo({
        task: formData.get("task") as string,
        completed: false,
        id: 0,
      });

      const response = await addNewTodo(formData);
      setResponseText(response);
    },
    undefined,
  );

  useEffect(() => {
    setTimeout(() => {
      setResponseText("");
    }, 2500);
  }, [responseText]);
  return (
    <>
      <div className="animate-pulse">
        {optimisticTodo && (
          <Todo {...optimisticTodo} onStatusChange={() => {}} />
        )}
      </div>
      {responseText && <p>{responseText}</p>}
      <form action={action}>
        <input type="text" name="task" />
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          Add
          {isPending && <Spinner size="small" color="secondary" />}
        </Button>
      </form>
    </>
  );
};
