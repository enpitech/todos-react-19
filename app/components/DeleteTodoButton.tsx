"use client";
import { TrashIcon } from "lucide-react";
import { useActionState } from "react";
import { deleteTodo } from "~/actions/deleteTodo";
import Spinner from "./Spinner";

export const DeleteTodoButton = ({ id }: { id: number }) => {
  const [, deleteTodoAction, isPending] = useActionState(
    (_prevState: unknown, _formData: FormData) => {
      deleteTodo(id);
    },
    undefined,
  );

  return (
    <form action={deleteTodoAction}>
      <button
        type="submit"
        disabled={isPending}
        className="bg-red-500 text-white rounded-md p-2"
      >
        {isPending && <Spinner size="small" color="secondary" />}
        <TrashIcon className="w-4 h-4" />
      </button>
    </form>
  );
};
