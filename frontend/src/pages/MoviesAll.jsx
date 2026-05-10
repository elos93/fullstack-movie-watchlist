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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Movies</h1>
        <p className="mt-1 text-gray-600">Your saved movies from MongoDB.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {movies.map((movie) => (
          <div key={movie._id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
                <p className="mt-1 inline-block rounded bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-700">
                  {movie.genre}
                </p>
              </div>
            </div>

            <p className="min-h-16 text-gray-700">{movie.description}</p>
            <button
              className="mt-5 w-full rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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
