import "@/assets/css/App.css";
import "@/assets/css/Customstyles.css";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Footer from "./components/shared/Footer";

const Home = lazy(() => import("./pages/Home"));
const Recomend = lazy(() => import("./pages/Recomend"));

function App() {
  return (
    <AnimatePresence>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recomendacion" element={<Recomend />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </AnimatePresence>
  );
}

export default App;
