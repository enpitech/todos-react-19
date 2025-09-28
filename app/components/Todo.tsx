"use client";
import { useTransition } from "react";
import { changeTodoStatus } from "~/actions/changeTodoStatus";
import type { TodoData } from "~/routes/home";
import Spinner from "./Spinner";

export type TodoProps = TodoData & {
  onStatusChange: (id: number, status: boolean) => void;
};

export const Todo = ({ task, completed, id }: TodoProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className={`flex items-center gap-2 ${isPending ? "opacity-50" : ""}`}>
      <input
        disabled={isPending}
        type="checkbox"
        name="statusadsas"
        checked={completed}
        onChange={() => startTransition(() => changeTodoStatus(id, !completed))}
      />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {task}
      </span>
      {isPending && <Spinner size="small" />}
    </div>
  );
};
