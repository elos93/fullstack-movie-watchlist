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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Search Movies</h1>
        <p className="mt-1 text-gray-600">Results update while you type.</p>
      </div>

      <input
        className="mb-6 w-full max-w-2xl rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        placeholder="Search by movie title"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {movies.map((movie) => (
          <div key={movie._id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
            <p className="mt-2 inline-block rounded bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-700">
              {movie.genre}
            </p>
            <p className="mt-3 text-gray-700">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesSearch;
