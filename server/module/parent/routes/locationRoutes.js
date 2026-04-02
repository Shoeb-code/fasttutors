// routes/locationRoutes.js
import express from "express";
import axios from 'axios';

const locationRouter = express.Router();

locationRouter.get("/search-location", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q,
          countrycodes: "in",
          limit: 5,
        },
        headers: {
          "User-Agent": "FastTutorsApp/1.0",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Location fetch failed" });
  }
});

export default locationRouter;