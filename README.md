# Full Stack Movie Watchlist App

Simple full stack movie watchlist project built with Node.js, Express, MongoDB, Mongoose, React, Vite and Tailwind CSS.

## Links

- Frontend link: https://movie-watchlist-frontend-seven.vercel.app
- Backend link: https://movie-watchlist-backend-navy.vercel.app

## Project Structure

```text
backend
frontend
README.md
```

## How To Run Locally

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Frontend pages:

- `/all-movies` - shows all movies
- `/add-movie` - adds a new movie
- `/search-movies` - searches movies while typing

## Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/movie_watchlist
FRONTEND_URL=http://localhost:5173
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
AI_GATEWAY_MODEL=openai/gpt-4o-mini
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## API Routes

- `GET /movies` - returns all movies
- `POST /movies` - adds a new movie
- `DELETE /movies/:id` - deletes a movie by id
- `GET /movies/search?name=value` - searches movies by title
- `POST /movies/generate` - uses Vercel AI Gateway to create a short movie description

## AI Usage Explanation

The backend has a `POST /movies/generate` endpoint. It receives a movie title and genre from the frontend, sends them to Vercel AI Gateway using `AI_GATEWAY_API_KEY` and `AI_GATEWAY_MODEL`, and returns only this JSON:

```json
{
  "description": "short movie description"
}
```

On the `/add-movie` page, the `Generate Description with AI` button fills the description field. The generated description is not saved automatically to MongoDB. The movie is saved only when the user clicks `Add Movie`.

AI was also used as a development assistant for project structure, debugging, API integration, deployment fixes, and README updates. The code was reviewed and tested manually against the exam requirements.
