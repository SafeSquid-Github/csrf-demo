const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/submit', (req, res) => {
  console.log(req.body);
  res.send('Thank you for registering!');
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
