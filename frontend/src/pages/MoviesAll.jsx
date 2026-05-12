import { useEffect, useState } from 'react';
import { deleteMovie, getMovies } from '../api.js';

function MoviesAll() {
  const [movies, setMovies] = useState([]);

  async function loadMovies() {
    const data = await getMovies();
    setMovies(data);
  }

  async function handleDelete(id) {
    await deleteMovie(id);
    setMovies(movies.filter((movie) => movie._id !== id));
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-400">Library</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">All Movies</h1>
          <p className="mt-3 text-sm text-zinc-300">Your saved movies from MongoDB.</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-sm backdrop-blur-xl">
          {movies.length} movies saved
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="group flex min-h-64 flex-col rounded-[2rem] border border-white/15 bg-white/92 p-6 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black leading-tight text-zinc-950">{movie.title}</h2>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[0_10px_25px_rgba(220,38,38,0.28)]">
                {movie.genre}
              </span>
            </div>

            <p className="flex-1 text-sm leading-6 text-zinc-600">{movie.description}</p>
            <button
              className="mt-6 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-red-600"
              onClick={() => handleDelete(movie._id)}
            >
              Delete Movie
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesAll;
