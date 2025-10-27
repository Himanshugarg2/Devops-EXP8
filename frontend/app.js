const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = globalThis.fetch;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.post('/submit', async (req, res) => {
  try {
    const formData = new URLSearchParams(req.body);
    const backendUrl = process.env.BACKEND_URL || 'http://backend:5000/submit';

    const resp = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const json = await resp.json();
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend listening on ${PORT}`));
