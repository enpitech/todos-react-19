const API_BASE_URL = "http://localhost:3001";
import { v4 as uuidv4 } from "uuid";
export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export const todosApi = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  },

  async create(todo: Omit<Todo, "id">): Promise<string> {
    try {
      if (!todo.task) {
        return "Task is required";
      }
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, id: uuidv4() }),
      });
      if (!response.ok) {
        return "Failed to create todo";
      }
      return "Task created successfully";
    } catch (error) {
      return "Failed to create todo";
    }
  },

  async update(id: number, updates: Partial<Todo>): Promise<string> {
    if (!id) {
      return "Id is required";
    }
    if (!updates) {
      return "Updates are required";
    }
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        return "Failed to update todo";
      }
      return "Task updated successfully";
    } catch (error) {
      return "Failed to update todo";
    }
  },

  async delete(id: number): Promise<string> {
    if (!id) {
      return "Id is required";
    }
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      return "Task deleted successfully";
    } catch (error) {
      return "Failed to delete todo";
    }
  },
};
