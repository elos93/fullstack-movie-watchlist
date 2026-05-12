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
        <h1 className="text-4xl font-black text-white md:text-5xl">Search Movies</h1>
        <p className="mt-3 text-sm text-zinc-300">Results update while you type.</p>
      </div>

      <input
        className="mb-8 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/92 px-5 py-4 text-sm text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.28)] outline-none backdrop-blur-xl transition placeholder:text-zinc-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
        placeholder="Search by movie title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="rounded-[2rem] border border-white/15 bg-white/92 p-6 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <h2 className="text-2xl font-black leading-tight text-zinc-950">{movie.title}</h2>
            <p className="mt-3 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[0_10px_25px_rgba(220,38,38,0.28)]">
              {movie.genre}
            </p>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesSearch;
