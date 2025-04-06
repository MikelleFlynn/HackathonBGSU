const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
  const query = req.body.q;

  try {
    const response = await fetch('https://permapeople.org/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-permapeople-key-id': process.env.KEY_ID,
        'x-permapeople-key-secret': process.env.KEY_SECRET,
      },
      body: JSON.stringify({ q: query }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.get('/api/plant/:id', async (req, res) => {
  const plantId = req.params.id;
  try {
    const response = await fetch(`https://permapeople.org/api/plants/${plantId}`, {
      headers: {
        "x-permapeople-key-id": process.env.KEY_ID,
        "x-permapeople-key-secret": process.env.KEY_SECRET
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch plant details' });
  }
});

