// https://react.dev/blog/2024/04/25/react-19#whats-new-in-react-19
// Fetch todos
// update todo
// show completed todos
// Race condition
// Throw an error - what will happen?
// useTransition - supporting async and error boundary - https://react.dev/reference/react/useTransition#

// Create new Todo
// display error
// formAction
// useActionState - React query -> Meta frameworks -> Primitive! - https://react.dev/reference/react/useActionState#noun-labs-1201738-(2)
// return error
// loading state with useFormStatus
// Improve update UX/Performance
// useOptimistic - https://react.dev/reference/react/useOptimistic#noun-labs-1201738-(2)

// use + Suspense - https://react.dev/reference/react/use#noun-labs-1201738-(2)

// Meta tags - https://react.dev/reference/react-dom/components/meta#noun-labs-1201738-(2)
// Performance

import { useState } from "react";
import { Todo, type TodoProps } from "~/components/Todo";

export default function Home() {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  return (
    <div className="App">
      <div className="Todos">
        <form>
          {todos.map((todo) => {
            return <Todo key={todo.id} {...todo} onStatusChange={() => {}} />;
          })}
        </form>
      </div>
    </div>
  );
}
