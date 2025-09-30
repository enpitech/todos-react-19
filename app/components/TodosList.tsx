import { AddNewTodo } from "./AddNewTodo";
import { Todo } from "./Todo";
import type { TodoData } from "~/routes/home";

export const TodosList = ({ todos }: { todos: TodoData[] }) => {
  return (
    <div className="Todos">
      {todos.length === 0 && (
        <div>
          <p>Create your first todo 🚀 </p>
        </div>
      )}
      {todos.map((todo: TodoData) => {
        return (
          <Todo
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            id={todo.id}
            onStatusChange={async (id, status) => {}}
          />
        );
      })}
      <AddNewTodo />
    </div>
  );
};
