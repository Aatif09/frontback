const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
let users = [];
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  res.status(200).json({ message: 'Login successful' });
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
