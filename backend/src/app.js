const express = require('express');
const app = express();
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');
const { redirectToUrl } = require('./controllers/linkController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({
    ok: true,
    version: '1.0'
  });
});

app.use('/api/links', linkRoutes);

app.get('/:code', redirectToUrl);

module.exports = app;
