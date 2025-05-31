const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect('mongodb://localhost:27017/borrowerDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `This is protected data for user ${req.user}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
