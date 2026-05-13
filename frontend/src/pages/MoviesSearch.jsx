import { useEffect, useState } from 'react';
import { searchMovies } from '../api.js';

function MoviesSearch() {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadSearchResults() {
      const data = await searchMovies(name);
      setMovies(data);
    }

    loadSearchResults();
  }, [name]);

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-400">Find movies</p>
        <h1 className="text-4xl font-black text-white md:text-6xl">Search the collection.</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">Type a title and the results update instantly.</p>
      </div>

      <input
        className="mb-8 w-full max-w-4xl rounded-3xl border border-white/15 bg-white px-5 py-4 text-base font-semibold text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.42)] outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/25"
        placeholder="Search by movie title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[rgba(12,12,14,0.82)] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-transparent" />
            <h2 className="relative text-2xl font-black leading-tight text-white">{movie.title}</h2>
            <p className="mt-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[0_10px_25px_rgba(220,38,38,0.28)]">
              {movie.genre}
            </p>
            <p className="relative mt-4 text-sm leading-6 text-zinc-300">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesSearch;
