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
        <h1 className="text-4xl font-black text-white md:text-5xl">Add New Movie</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
          Fill in the details, generate a short description if you want, then save the movie.
        </p>
      </div>

      <form
        className="max-w-3xl rounded-[2rem] border border-white/15 bg-white/92 p-6 text-zinc-950 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:p-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-2 block text-sm font-black text-zinc-900" htmlFor="title">
            Movie Title
          </label>
          <input
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            id="title"
            placeholder="e.g. The Matrix"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-black text-zinc-900" htmlFor="genre">
            Genre
          </label>
          <input
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            id="genre"
            placeholder="e.g. Sci-Fi"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-black text-zinc-900" htmlFor="description">
            Short Description
          </label>
          <textarea
            className="min-h-36 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            id="description"
            placeholder="Brief summary of the movie..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 transition hover:border-red-600 hover:bg-red-50 hover:text-red-700"
            type="button"
            onClick={handleGenerateDescription}
          >
            Generate Description with AI
          </button>
          <button className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,0,0,0.25)] transition hover:bg-red-600">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieAdd;
