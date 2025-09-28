import { useLoaderData } from "react-router";
import { TodosList } from "~/components/TodosList";

export type TodoData = {
  task: string;
  completed: boolean;
  id: number;
};

export const loader = async () => {
  debugger;
  return <TodosList />;
};

export default function Home() {
  const todos = useLoaderData<typeof loader>();
  return <div className="App">{todos}</div>;
}
