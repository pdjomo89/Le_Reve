import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import News from "./pages/News.jsx";
import Article from "./pages/Article.jsx";
import Consultation from "./pages/Consultation.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./index.css";
import "./styles/app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "gallery", element: <Gallery /> },
      { path: "news", element: <News /> },
      { path: "news/:slug", element: <Article /> },
      { path: "consultation", element: <Consultation /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
