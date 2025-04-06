const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔍 Handle search POST from frontend
app.post("/api/search", async (req, res) => {
  const query = req.body.q || "";

  try {
    const response = await fetch("https://permapeople.org/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-permapeople-key-id": process.env.KEY_ID,
        "x-permapeople-key-secret": process.env.KEY_SECRET,
      },
      body: JSON.stringify({ q: query, page: 1 }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error during search:", err);
    res.status(500).json({ error: "Search failed." });
  }
});

// 🌱 Get plant by ID
app.get("/api/plant/:id", async (req, res) => {
  const plantId = req.params.id;

  try {
    const response = await fetch(`https://permapeople.org/api/plants/${plantId}`, {
      headers: {
        "x-permapeople-key-id": process.env.KEY_ID,
        "x-permapeople-key-secret": process.env.KEY_SECRET,
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching plant details:", err);
    res.status(500).json({ error: "Failed to fetch plant details." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});









