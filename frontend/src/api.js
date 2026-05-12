const API_URL = import.meta.env.VITE_API_URL;

async function readResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();
  const data = text && contentType.includes('application/json') ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || text || 'Request failed');
  }

  return data;
}

export async function getMovies() {
  const response = await fetch(`${API_URL}/movies`);
  return readResponse(response);
}

export async function addMovie(movie) {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });

  return readResponse(response);
}

export async function deleteMovie(id) {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE'
  });

  return readResponse(response);
}

export async function searchMovies(name) {
  const response = await fetch(`${API_URL}/movies/search?name=${encodeURIComponent(name)}`);
  return readResponse(response);
}

export async function generateDescription(title, genre) {
  const response = await fetch(`${API_URL}/movies/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, genre })
  });

  return readResponse(response);
}
