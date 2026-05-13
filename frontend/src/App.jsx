import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import cinemaHero from './assets/cinema-hero.png';
import MoviesAll from './pages/MoviesAll.jsx';
import MovieAdd from './pages/MovieAdd.jsx';
import MoviesSearch from './pages/MoviesSearch.jsx';

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold transition ${
    isActive
      ? 'bg-white text-zinc-950 shadow-[0_14px_35px_rgba(255,255,255,0.16)]'
      : 'text-zinc-300 hover:bg-white/10 hover:text-white'
  }`;

function App() {
  return (
    <div className="min-h-screen bg-[#09090a] text-white lg:flex">
      <div className="fixed inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${cinemaHero})` }} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.36),transparent_30%),radial-gradient(circle_at_55%_90%,rgba(127,29,29,0.3),transparent_35%),linear-gradient(90deg,rgba(3,3,4,0.98),rgba(8,8,10,0.86),rgba(8,8,10,0.58))]" />

      <aside className="relative z-10 bg-black/80 text-white backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-white/10">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-800 text-lg font-black shadow-[0_0_38px_rgba(239,68,68,0.72)]">
            W
          </div>
          <div>
            <h1 className="text-lg font-black">Watchlist</h1>
            <p className="text-xs text-zinc-400">Cinema dashboard</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-1 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-5 lg:py-8">
          <NavLink className={linkClass} to="/all-movies">
            All Movies
          </NavLink>
          <NavLink className={linkClass} to="/add-movie">
            Add New Movie
          </NavLink>
          <NavLink className={linkClass} to="/search-movies">
            Search Movie
          </NavLink>
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
