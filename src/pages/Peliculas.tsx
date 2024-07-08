import MoviesRecomendGrid from "@/components/Movies/MoviesRecomendGrid";
import { MoviesRecomendProvider } from "@/core/hooks/MoviesRecomendContext";

const Peliculas = () => {
  return (
    <div className="mt-20">
      <section className="">
        <MoviesRecomendProvider>
          <MoviesRecomendGrid page="peliculas" />
        </MoviesRecomendProvider>
      </section>
    </div>
  );
};

export default Peliculas;
