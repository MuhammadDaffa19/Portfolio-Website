import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";

// Load only the requested page. Keep Layout eager so navigation and shared
// accessibility behavior remain mounted while route modules are fetched.
const lazyPage = (importPage) => async () => ({
  Component: (await importPage()).default,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, lazy: lazyPage(() => import("./pages/Home.jsx")) },
      { path: "about", lazy: lazyPage(() => import("./pages/About.jsx")) },
      { path: "projects", lazy: lazyPage(() => import("./pages/Projects.jsx")) },
      { path: "skills", lazy: lazyPage(() => import("./pages/Skills.jsx")) },
      { path: "experience", lazy: lazyPage(() => import("./pages/Experience.jsx")) },
      { path: "certificates", lazy: lazyPage(() => import("./pages/Certificates.jsx")) },
      { path: "contact", lazy: lazyPage(() => import("./pages/Contact.jsx")) },
    ],
  },
]);
