import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/index.tsx"),
  route("/home", "routes/home.tsx"),
  route("/todos/:id?", "routes/todos.tsx"),
] satisfies RouteConfig;
