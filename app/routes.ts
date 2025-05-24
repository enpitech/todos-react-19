import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/welcome", "routes/welcome.tsx"),
  route("/home", "routes/home.tsx"),
  route("/todos/:id?", "routes/todos.tsx"),
] satisfies RouteConfig;
