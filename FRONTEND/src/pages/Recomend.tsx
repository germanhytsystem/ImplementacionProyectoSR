import MoviesRecomendGrid from "@/components/Movies/MoviesRecomendGrid";
import { MoviesRecomendProvider } from "@/core/hooks/MoviesRecomendContext";

const Recomend = () => {
  return (
    <div>
      <section>
        <MoviesRecomendProvider>
          <MoviesRecomendGrid page="recomendacion" />
        </MoviesRecomendProvider>
      </section>
    </div>
  );
};

export default Recomend;
