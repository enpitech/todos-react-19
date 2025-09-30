import type { TodoData } from "~/routes/home";
import { TodoCheckbox } from "./TodoCheckbox";
import { DeleteTodoButton } from "./DeleteTodoButton";

export type TodoProps = TodoData & {
  onStatusChange: (id: number, status: boolean) => void;
};

export const Todo = ({ task, completed, id }: TodoProps) => {
  return (
    <div className={`flex items-center gap-2 group`}>
      <TodoCheckbox id={id} completed={completed} />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {task}
      </span>
      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <DeleteTodoButton id={id} />
      </span>
    </div>
  );
};
