import { todosApi } from "~/api/todos";

export const deleteTodo = async (id: number) => {
  const response = await todosApi.delete(id);
  return response;
};
