import app from './app.js';
const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT} `);
});
