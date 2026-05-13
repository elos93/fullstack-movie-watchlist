import { useState } from 'react';
import { addMovie, generateDescription } from '../api.js';

function MovieAdd() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  async function handleGenerateDescription() {
    if (title.trim().length < 1) {
      alert('Title is required');
      return;
    }

    if (genre.trim().length < 1) {
      alert('Genre is required');
      return;
    }

    try {
      const data = await generateDescription(title.trim(), genre.trim());
      setDescription(data.description);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim().length < 1) {
      alert('Title is required');
      return;
    }

    if (title.length > 20) {
      alert('Title must be 20 characters or less');
      return;
    }

    if (genre.trim().length < 1) {
      alert('Genre is required');
      return;
    }

    if (description.trim().length < 1) {
      alert('Description is required');
      return;
    }

    if (description.length > 200) {
      alert('Description must be 200 characters or less');
      return;
    }

    try {
      await addMovie({
        title: title.trim(),
        genre: genre.trim(),
        description: description.trim()
      });
    } catch (error) {
      alert(error.message);
      return;
    }

    alert('Movie added');
    setTitle('');
    setGenre('');
    setDescription('');
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-400">Create watch item</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
          Build your cinematic watchlist.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
          Fill in the details, generate a short description if you want, then save the movie.
        </p>
      </div>

      <form className="relative max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[rgba(9,9,11,0.78)] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.62)] backdrop-blur-2xl lg:p-8" onSubmit={handleSubmit}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

        <div>
          <label className="mb-3 block text-sm font-black text-white" htmlFor="title">
            Movie Title
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-base font-semibold text-zinc-950 shadow-inner outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/25"
            id="title"
            placeholder="e.g. The Matrix"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="mt-5">
          <label className="mb-3 block text-sm font-black text-white" htmlFor="genre">
            Genre
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-base font-semibold text-zinc-950 shadow-inner outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/25"
            id="genre"
            placeholder="e.g. Sci-Fi"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div className="mt-5">
          <label className="mb-3 block text-sm font-black text-white" htmlFor="description">
            Short Description
          </label>
          <textarea
            className="min-h-40 w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-base font-semibold text-zinc-950 shadow-inner outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/25"
            id="description"
            placeholder="Brief summary of the movie..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-2xl border border-white/20 bg-white px-5 py-4 text-sm font-black text-zinc-950 shadow-[0_18px_45px_rgba(255,255,255,0.12)] transition hover:bg-zinc-100"
            type="button"
            onClick={handleGenerateDescription}
          >
            Generate Description with AI
          </button>
          <button className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 px-5 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(220,38,38,0.38)] transition hover:from-red-500 hover:to-red-700">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieAdd;
