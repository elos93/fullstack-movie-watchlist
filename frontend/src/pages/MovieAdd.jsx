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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add Movie</h1>
        <p className="mt-1 text-gray-600">Add a movie with title, genre and description.</p>
      </div>

      <form className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-semibold text-gray-800" htmlFor="title">
            Title
          </label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block font-semibold text-gray-800" htmlFor="genre">
            Genre
          </label>
          <input
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block font-semibold text-gray-800" htmlFor="description">
            Description
          </label>
          <button
            className="mb-3 rounded border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
            type="button"
            onClick={handleGenerateDescription}
          >
            Generate Description with AI
          </button>
          <textarea
            className="min-h-32 w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button className="mt-5 rounded bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieAdd;
