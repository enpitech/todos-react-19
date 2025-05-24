import type { TodoData } from "~/routes/home";

export type TodoProps = TodoData & {
  onStatusChange: (id: number, status: boolean) => void;
};

export const Todo = ({ task, completed, id, onStatusChange }: TodoProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onStatusChange(id, !completed)}
      />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {task}
      </span>
    </div>
  );
};
