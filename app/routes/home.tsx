import { useEffect, useState } from "react";
import { Todo } from "~/components/Todo";

export type TodoData = {
  task: string;
  completed: boolean;
  id: number;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError("");
    setLoading(true);
    fetch("/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((e) => setError(e.toString()))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="Todos">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        <form>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                {...todo}
                onStatusChange={async (id, status) => {}}
              />
            );
          })}
        </form>
      </div>
    </div>
  );
}
