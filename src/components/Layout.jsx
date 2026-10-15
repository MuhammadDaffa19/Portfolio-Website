import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import PageTransition from "./PageTransition.jsx";
import LanguageToggle from "./LanguageToggle.jsx";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const lastPath = useRef(location.pathname);

  // React Router replaces the content without a full page load. Move focus
  // to the new heading so keyboard and screen-reader users get page context.
  useEffect(() => {
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;
    const heading = document.querySelector(".page-transition h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, [location.pathname]);

  return (
    <main className={isHome ? "site-layout is-home" : "site-layout is-inner"}>
      {isHome && <LanguageToggle />}

      {!isHome && <Navbar />}

      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
    </main>
  );
}

export default Layout;