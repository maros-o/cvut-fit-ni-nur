import { Movie } from "@/app/_mock_data/movies";

export const MovieHeader = ({ movie }: { movie: Movie }) => {
  return (
    <header className="flex flex-col gap-4 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex-shrink-0 text-md">
          {movie.day} <span className="font-bold">{movie.datetime}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {movie.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-1 bg-white rounded-md text-xs drop-shadow"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};
