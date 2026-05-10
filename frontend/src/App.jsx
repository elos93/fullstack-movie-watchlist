import { Link, Navigate, Route, Routes } from 'react-router-dom';
import MoviesAll from './pages/MoviesAll.jsx';
import MovieAdd from './pages/MovieAdd.jsx';
import MoviesSearch from './pages/MoviesSearch.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Movie Watchlist</h1>

          <div className="flex flex-wrap gap-2">
            <Link
              className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
              to="/all-movies"
            >
            All Movies
            </Link>
            <Link
              className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              to="/add-movie"
            >
            Add Movie
            </Link>
            <Link
              className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              to="/search-movies"
            >
            Search
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/all-movies" />} />
          <Route path="/all-movies" element={<MoviesAll />} />
          <Route path="/add-movie" element={<MovieAdd />} />
          <Route path="/search-movies" element={<MoviesSearch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
