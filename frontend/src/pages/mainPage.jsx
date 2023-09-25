import { Footer, Header } from "./components";

import Home from "./Home";
import About from "./About";
import E_shop from "./E_shop";
import Resources from "./Resources";
import Support from "./Support";
import AppData from "./AppContect";
import Account from "./Account";

import { Routes,Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MainPage = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);
  return (
    <div className="Main">
      <AppData>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources/*" element={<Resources />} />
          <Route path="/support" element={<Support />} />
          <Route path="/e-shopping" element={<E_shop />} />
          <Route path="account-page" element={<Account />}/>
        </Routes>
        <Footer />
      </AppData>
    </div>
  )
}

export default MainPage;