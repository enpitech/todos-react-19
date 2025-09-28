"use server";
import { TODOS } from "~/routes/todos";

export const addNewTodo = async (formData: FormData) => {
  const task = formData.get("task");
  if (typeof task !== "string" || !task) {
    throw new Response("Task is required", { status: 400 });
  }
  const todo = {
    task,
    completed: false,
    id: TODOS.length + 1,
  };
  TODOS.push(todo);
};
