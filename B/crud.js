// const express = require('express');
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/usersjson', async (req, res) => {
  const newusers = await fs.readFile("./cusers.json", "utf8");
  const usersjson = JSON.parse(newusers);
  res.send(usersjson);
})
app.get('/api/usersjson/:id', async (req, res) => {
  const { id } = req.params;
  const newusers = await fs.readFile("./cusers.json", "utf8");
  const usersjson = JSON.parse(newusers);
  const user = usersjson.find((user) => {
    return user.id == id
  })
  res.send(user);
})
app.post('/api/usersjson', async (req, res) => {
  const newusers = await fs.readFile("./cusers.json", "utf8");
  const usersjson = JSON.parse(newusers);
  const { name, age } = req.body;
  const newid = usersjson.length > 0 ? usersjson[usersjson.length - 1].id + 1 : 1;
  usersjson.push({ id: newid, name, age });
  await fs.writeFile("./cusers.json", JSON.stringify(usersjson), "utf8")
  res.status(201).send("User created Successfully");
})
app.patch('/api/usersjson/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newusers = await fs.readFile("./cusers.json", "utf8");
  const usersjson = JSON.parse(newusers);
  const userIndex = usersjson.findIndex((user) => {
    return user.id == id
  })
  usersjson[userIndex].name = name;
  await fs.writeFile("./cusers.json", JSON.stringify(usersjson), "utf8")
  res.send("user's partial update created Successfully");
})
app.delete('/api/usersjson/:id', async (req, res) => {
  const { id } = req.params;
  const newusers = await fs.readFile("./cusers.json", "utf8");
  const usersjson = JSON.parse(newusers);
  const userIndex = usersjson.findIndex((user) => {
    return user.id == id
  })
  usersjson.splice(userIndex, 1);
  await fs.writeFile("./cusers.json", JSON.stringify(usersjson), "utf8")
  res.send("user deleted Successfully");
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})