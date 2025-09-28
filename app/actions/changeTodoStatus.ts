"use server";

import { TODOS } from "~/routes/todos";

export async function changeTodoStatus(id: number, status: boolean) {
  const todoToUpdate = TODOS.find((todo) => {
    return todo.id === id;
  });

  if (!todoToUpdate) {
    return;
  }
  todoToUpdate.completed = status;
}
