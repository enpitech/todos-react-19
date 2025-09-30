"use client";
import { changeTodoStatus } from "~/actions/changeTodoStatus";

export const TodoCheckbox = ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => {
  const handleChange = () => {
    changeTodoStatus(id, !completed);
  };
  return (
    <input
      type="checkbox"
      name="statusadsas"
      checked={completed}
      onChange={handleChange}
    />
  );
};
