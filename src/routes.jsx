import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Skills from "./pages/Skills.jsx";
import Experience from "./pages/Experience.jsx";
import Certificates from "./pages/Certificates.jsx";
import Contact from "./pages/Contact.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "experience",
        element: <Experience />,
      },
      {
        path: "certificates",
        element: <Certificates />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);