"use server";
import { todosApi } from "~/api/todos";

export async function changeTodoStatus(id: number, status: boolean) {
  return await todosApi.update(id, { completed: status });
}
