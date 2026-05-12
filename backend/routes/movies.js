import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, genre, description } = req.body;
    const movie = await Movie.create({ title, genre, description });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const searchValue = req.query.name || '';
    const movies = await Movie.find({
      title: { $regex: escapeRegex(searchValue), $options: 'i' }
    }).sort({ createdAt: -1 });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const { title, genre } = req.body;

    if (typeof title !== 'string' || typeof genre !== 'string' || !title.trim() || !genre.trim()) {
      return res.status(400).json({ message: 'Title and genre are required' });
    }

    if (!process.env.AI_GATEWAY_API_KEY) {
      return res.status(500).json({ message: 'AI Gateway API key is missing' });
    }

    if (!process.env.AI_GATEWAY_MODEL) {
      return res.status(500).json({ message: 'AI_GATEWAY_MODEL is missing' });
    }

    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.AI_GATEWAY_MODEL,
        stream: false,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'Return only valid JSON in this format: {"description":"short movie description"}.'
          },
          {
            role: 'user',
            content: `Create a short movie description for a movie titled "${title.trim()}" in the "${genre.trim()}" genre. The description must be 200 characters or less.`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.error?.message || 'AI request failed' });
    }

    const content = data.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(content);

    res.json({ description: parsed.description || '' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
