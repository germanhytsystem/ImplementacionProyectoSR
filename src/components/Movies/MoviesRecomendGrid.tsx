import MovieSingle from "@/components/Movies/MovieSingle";
import { useContext, useRef } from "react";
import { MoviesRecomendContext } from "@/core/hooks/MoviesRecomendContext";

interface IProps {
  page: any;
}

const MoviesRecomendGrid = ({ page }: IProps) => {
  const { setUserId, moviesRecomend, moviesRecomendList } = useContext(
    MoviesRecomendContext
  );

  // Obtener el valor del userId del input y luego setear el user id
  const inputdata = useRef<HTMLInputElement>(null);

  const handleUserId = () => {
    if (inputdata.current) {
      console.log("inputdata.current.value", inputdata.current.value);
      setUserId(parseInt(inputdata.current.value));
    }
  };

  return (
    <>
      <section className="w-full container mx-auto my-8 sm:my-10">
        <div
          className="
                        flex
						flex-col
						sm:flex-row						
                        justify-center
                        border-b 
                        border-secondary-light
                        pb-3
                        gap-3
                        "
        >
          <div className="flex justify-between gap-4">
            <span className="flex items-center">UserID</span>
            <input
              ref={inputdata}
              className=" 
                        pl-3
                        pr-1
                        sm:px-4
                        py-2
                        border-2 
                        border-gray-200
                        rounded-lg
                        text-sm
                        sm:text-base
                        font-semibold
                        bg-primary-light
                        text-primary-dark
                        w-full
                        sm:w-fit
                        "
              id="name"
              name="name"
              type="number"
              placeholder="Ejm: 50"
              aria-label="Name"
            />
            <button
              className="
                bg-primary-dark
                text-primary-light
                font-bold
                py-2
                px-4
                rounded-md"
              type="button"
              onClick={handleUserId}
            >
              Recomendar
            </button>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10">
        {moviesRecomendList !== undefined && moviesRecomendList.length > 0 ? (
          <>
            {moviesRecomend !== undefined && moviesRecomend.length > 0 ? (
              <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
                {page === "home"
                  ? moviesRecomend
                      .filter((_p, index) => index < 6)
                      .map((movie) => (
                        <MovieSingle
                          title={movie.title}
                          genres={movie.genres}
                          numbermovie={movie.movieId}
                          prediction={movie.predictions}
                          key={movie.movieId}
                        />
                      ))
                  : moviesRecomend.map((movie) => (
                      <MovieSingle
                        title={movie.title}
                        genres={movie.genres}
                        numbermovie={movie.movieId}
                        prediction={movie.predictions}
                        key={movie.movieId}
                      />
                    ))}
              </div>
            ) : (
              <div className="w-full mx-auto min-h-[300px] my-20 ">
                <div className="text-center font-bold">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-full mx-auto min-h-[300px] my-20 ">
              <div className="text-center font-bold">Loading...</div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default MoviesRecomendGrid;
