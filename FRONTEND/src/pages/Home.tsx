import MoviesGrid from "@/components/Movies/MoviesGrid";
import { MoviesProvider } from "@/core/hooks/MoviesContext";

const Home = () => {
  return (
    <div>
      <section>
        <MoviesProvider>
          <MoviesGrid page="home" />
        </MoviesProvider>
      </section>
    </div>
  );
};

export default Home;
