// const selectOptions = [
//   "genre1",
//   "genre2",
//   "genre3",
//   "genre4",
//   "genre5",
//   "genre6",
// ];

interface IProps {
  setSelectedGenre: (value: string) => void;
  movies: any;
}

const MoviesFilter = ({ setSelectedGenre, movies }: IProps) => {
  const selectOptions = movies.map((movie: any) => movie.genres);

  return (
    <select
      onChange={(e) => {
        setSelectedGenre(String(e.target.value));
      }}
      className="font-normal
                  px-4
                  sm:px-6
                  py-2
                  border-2
                  border-gray-200
                  shadow-lg
                  rounded-lg
                  text-sm
                  sm:text-md
                  dark:font-medium
                  bg-primary-light
                  text-primary-dark
              "
    >
      <option value="" className="text-sm sm:text-md">
        Género
      </option>

      {selectOptions.map((option: string) => (
        <option key={option} className="text-normal sm:text-md">
          {option}
        </option>
      ))}
    </select>
  );
};

export default MoviesFilter;
