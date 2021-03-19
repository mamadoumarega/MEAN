const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// correction cors errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).send({
    message: 'Post added successfully!'
  });
});

app.get("/api/posts",(req, res, next) => {

  const posts = [
    {
      id: 'fadf123',
      title: 'First server-side post',
      content: 'First Content'
    },
    {
      id: 'fadf124',
      title: 'Second server-side post',
      content: 'Second Content'
    },
    {
      id: 'fadf125',
      title: 'Third server-side post',
      content: 'Third Content'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});


module.exports = app;
