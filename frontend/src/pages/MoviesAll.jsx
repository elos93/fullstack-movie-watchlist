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
          <h1 className="text-4xl font-black text-white md:text-6xl">Your movie vault.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">Browse everything you saved from MongoDB in one cinematic grid.</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black text-white shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          {movies.length} movies saved
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="group relative flex min-h-72 overflow-hidden rounded-[2rem] border border-white/15 bg-[rgba(12,12,14,0.82)] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-red-400/70 hover:shadow-[0_34px_110px_rgba(0,0,0,0.65)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-transparent" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="relative text-2xl font-black leading-tight text-white">{movie.title}</h2>
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[0_10px_25px_rgba(220,38,38,0.28)]">
                {movie.genre}
              </span>
            </div>

            <p className="relative flex-1 text-sm leading-6 text-zinc-300">{movie.description}</p>
            <button
              className="relative mt-6 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-black text-zinc-950 transition hover:bg-red-600 hover:text-white"
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
