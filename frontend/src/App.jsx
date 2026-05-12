import { Link, Navigate, Route, Routes } from 'react-router-dom';
import cinemaHero from './assets/cinema-hero.png';
import MoviesAll from './pages/MoviesAll.jsx';
import MovieAdd from './pages/MovieAdd.jsx';
import MoviesSearch from './pages/MoviesSearch.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#09090a] text-white lg:flex">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url(${cinemaHero})` }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.28),transparent_35%),linear-gradient(90deg,rgba(9,9,10,0.98),rgba(9,9,10,0.78),rgba(9,9,10,0.45))]" />

      <aside className="relative z-10 bg-black/80 text-white backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-white/10">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-lg font-black shadow-[0_0_35px_rgba(220,38,38,0.65)]">
            W
          </div>
          <div>
            <h1 className="text-lg font-black">Watchlist</h1>
            <p className="text-xs text-zinc-400">Cinema dashboard</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-5 lg:py-8">
          <Link
            className="whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-zinc-200 transition hover:bg-white/10 hover:text-white"
            to="/all-movies"
          >
            All Movies
          </Link>
          <Link
            className="whitespace-nowrap rounded-2xl bg-white px-4 py-3 text-sm font-black text-zinc-950 shadow-[0_14px_35px_rgba(255,255,255,0.14)] transition hover:bg-red-600 hover:text-white"
            to="/add-movie"
          >
            Add New Movie
          </Link>
          <Link
            className="whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-zinc-200 transition hover:bg-white/10 hover:text-white"
            to="/search-movies"
          >
            Search Movie
          </Link>
        </nav>

        <div className="hidden border-t border-white/10 px-6 py-5 text-xs text-zinc-500 lg:block">
          Your personal movie tracker
        </div>
      </aside>

      <main className="relative z-10 min-h-screen flex-1 px-5 py-8 lg:ml-72 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<Navigate to="/all-movies" />} />
            <Route path="/all-movies" element={<MoviesAll />} />
            <Route path="/add-movie" element={<MovieAdd />} />
            <Route path="/search-movies" element={<MoviesSearch />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
