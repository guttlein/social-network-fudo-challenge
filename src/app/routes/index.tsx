import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";

// Application router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post/:id",
    element: <PostDetail />,
  },
]);
