const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

function getApiUrl(path) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is missing');
  }

  return `${API_URL}${path}`;
}

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
  const response = await fetch(getApiUrl('/movies'));
  return readResponse(response);
}

export async function addMovie(movie) {
  const response = await fetch(getApiUrl('/movies'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });

  return readResponse(response);
}

export async function deleteMovie(id) {
  const response = await fetch(getApiUrl(`/movies/${id}`), {
    method: 'DELETE'
  });

  return readResponse(response);
}

export async function searchMovies(name) {
  const query = encodeURIComponent(name);
  const response = await fetch(getApiUrl(`/movies/search?name=${query}`));
  return readResponse(response);
}

export async function generateDescription(title, genre) {
  const response = await fetch(getApiUrl('/movies/generate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, genre })
  });

  return readResponse(response);
}
