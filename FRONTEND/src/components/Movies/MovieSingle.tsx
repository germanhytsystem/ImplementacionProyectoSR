import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  genres: string;
  numbermovie: number;
}

const MovieSingle = ({ title, genres, numbermovie }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}
    >
      <Link
        to={`/peliculas/single/${numbermovie}`}
        aria-label="Single Project"
      >
        <div className="min-h-[400px] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.1] transition-all duration-500 cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
          <div>
            <img
              src="https://res.cloudinary.com/dvammrjzi/image/upload/v1708229239/DAVID-PORTFOLIO/gratis-png-tira-de-pelicula-formato-psd_n88lir.png"
              className="rounded-t-xl border-none w-full object-cover"
              alt="Single Project"
            />
          </div>
          <div className="text-center px-4 py-6">
            <p className="font-bold break-all font-general-medium text-lg md:text-xl text-ternary-dark  mb-2">
              {title}
            </p>
            <span className="break-all  text-lg text-ternary-dark ">
              {genres}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieSingle;
