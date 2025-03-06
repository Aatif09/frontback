const express = require('express');
const axios = require('axios');
// const cors = require('cors');
const app = express();
const port = 5000;
// Enable CORS so your frontend can fetch data from this server
// app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    // Fetch data from the dummyjson API
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    // Send the data to the frontend
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
