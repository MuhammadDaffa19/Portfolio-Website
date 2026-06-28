import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import PageTransition from "./PageTransition.jsx";
import LanguageToggle from "./LanguageToggle.jsx";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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