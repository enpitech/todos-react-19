"use server";
import { todosApi } from "~/api/todos";
import { sleep } from "~/utils";

export const addNewTodo = async (formData: FormData) => {
  await sleep(1000);

  const response = await todosApi.create({
    task: formData.get("task") as string,
    completed: false,
  });

  return response;
};
