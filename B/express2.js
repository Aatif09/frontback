const express = require('express');
const axios = require('axios');
// const cors = require('cors');
const app = express();
const port = 3005;
// app.use(cors());
app.get('/api/products', async (req, res) => {
  const api = await axios.get("https://dummyjson.com/products");
  res.send(api.data.products);
});
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
