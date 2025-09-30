import { useLoaderData } from "react-router";
import { todosApi } from "~/api/todos";
import { TodosList } from "~/components/TodosList";

export type TodoData = {
  task: string;
  completed: boolean;
  id: number;
};

export const loader = async () => {
  const todos = await todosApi.getAll();
  return <TodosList todos={todos} />;
};

export default function Home() {
  const todos = useLoaderData<typeof loader>();
  return <div className="App">{todos}</div>;
}
