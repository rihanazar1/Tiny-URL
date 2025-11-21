const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const linkRoutes = require('./routes/linkRoutes');
const { redirectToUrl } = require('./controllers/linkController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (req, res) => {
  res.status(200).json({
    ok: true,
    version: '1.0'
  });
});

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/links', linkRoutes);

app.get('/:code', redirectToUrl);

module.exports = app;
