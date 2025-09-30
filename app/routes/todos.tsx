import { todosApi } from "~/api/todos";

export const loader = async () => {
  try {
    const todos = await todosApi.getAll();
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Response("Failed to load todos", { status: 500 });
  }
};
