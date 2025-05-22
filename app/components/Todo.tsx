export interface TodoProps {
  task: string;
  completed: boolean;
  id: number;
  onStatusChange: (id: number, status: boolean) => void;
}

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
