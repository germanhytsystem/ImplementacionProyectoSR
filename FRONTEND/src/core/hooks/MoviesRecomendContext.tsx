import { createContext, useEffect, useState } from "react";
import MoviesRecomend from "../basehex/domain/MoviesRecomend";
import { useListMoviesRecomend } from "../basehex/application/useListMoviesReomend";

export const MoviesRecomendContext = createContext<{
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  moviesRecomend: MoviesRecomend[];
  moviesRecomendList: MoviesRecomend[] | undefined;
}>({
  setUserId: () => {},
  moviesRecomend: [] as MoviesRecomend[],
  moviesRecomendList: [] as MoviesRecomend[],
});

interface IProps {
  children: React.ReactNode;
}

export const MoviesRecomendProvider = (props: IProps) => {
  const [moviesRecomend, setMoviesRecomend] = useState<MoviesRecomend[]>(
    [] as MoviesRecomend[]
  );
  const [userId, setUserId] = useState<number | null>(4);

  const { data: moviesRecomendList } = useListMoviesRecomend(userId ?? 2);
//   console.log("moviesRecomendList", moviesRecomendList);

  useEffect(() => {
    if (moviesRecomendList) {
      setMoviesRecomend(moviesRecomendList);
    }
  }, [moviesRecomendList]);

  return (
    <MoviesRecomendContext.Provider
      value={{
        moviesRecomendList,
        setUserId,
        moviesRecomend,
      }}
    >
      {props.children}
    </MoviesRecomendContext.Provider>
  );
};
