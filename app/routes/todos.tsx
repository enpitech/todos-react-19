import type { ActionFunctionArgs } from "react-router";
import { sleep } from "~/utils";

const TODOS = [
  { task: "Walk the dog", completed: false, id: 1 },
  { task: "Do dishes", completed: false, id: 2 },
  { task: "Learn about React 19", completed: true, id: 3 },
];

export const loader = async () => {
  // throw new Error("error");
  await sleep(1000);
  return new Response(JSON.stringify(TODOS), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // throw new Error("error");
  await sleep(1000);

  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const status = formData.get("status") === "true";

  if (id && status !== undefined) {
    const todoToUpdate = TODOS.find((todo) => {
      return todo.id === id;
    });
    if (!todoToUpdate) {
      throw new Response("Todo not found", { status: 404 });
    }
    todoToUpdate.completed = status;
  } else {
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
  }

  return new Response(JSON.stringify(TODOS), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
