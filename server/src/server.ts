import express from 'express';

const port = process.env.PORT ?? 3000;

const app = express();

app.get('/', (req, res) => {
  res.json('Hello from server!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
