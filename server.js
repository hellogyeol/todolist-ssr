require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;
const client = new MongoClient(url);

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  await client.connect();
  const col = client.db('ssrDb').collection('ssrCol');

  const todoList = await col.find({}).toArray();
  console.log(todoList);

  res.render('index', {
    todoList: todoList
  });
});

app.post('/', async (req, res) => {
  await client.connect();
  const col = client.db('ssrDb').collection('ssrCol');

  await col.insertOne({
    content: req.body.content
  });

  const todoList = await col.find({}).toArray();
  console.log(todoList);

  res.render('index', {
    todoList: todoList
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});