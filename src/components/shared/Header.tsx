import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  // recibir la ruta actual
  const { pathname } = useLocation();

  return (
    <header className="w-full bg-primary-dark  flex flex-col flex-wrap overflow-x-hidden text-primary-light">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="nav"
        className="w-full "
      >
        <div className="container sm:mx-auto z-10 block sm:flex sm:justify-between sm:items-center py-6">
          <div className="flex justify-between items-center">
            {/* Logo*/}
            <Link to="/">
              <div className="text-3xl sm:text-4xl font-semibold">
                Sistema de Recomendación
              </div>
            </Link>
            {/* Menu in responsive */}
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="focus:outline-none"
                aria-label="Hamburger Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-10 w-10 fill-current text-primary-light"
                >
                  {showMenu ? (
                    <FiX className="text-3xl" />
                  ) : (
                    <FiMenu className="text-3xl" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden sm:flex">
            {pathname === "/peliculas" || pathname === "/" ? (
              <>
                <Link to="/recomendacion">
                  <div className="bg-secondary-light px-4 py-2 rounded-[5px] text-black font-semibold hover:scale-[1.1] transition-all duration-300">
                    Recomendaciones
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <div className="bg-red-600 px-4 py-2 rounded-[5px] text-black font-semibold hover:scale-[1.1] transition-all duration-300">
                    Atras
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
