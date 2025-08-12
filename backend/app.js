const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import auth middleware
const { verifyToken, isAdmin } = require('./middlewares/auth');

// Middleware — place these first!
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:61706'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const companiesRoutes = require('./routes/companies');
const authRoutes = require('./routes/auth.routes');
const aiRoutes = require('./routes/ai.routes');
const workersRoutes = require('./routes/workers'); 
const financeRoutes = require('./routes/finances');
const statsRoutes = require('./routes/stats');
const predictRoutes = require('./routes/predict');
const path = require('path');

app.use('/api/predict', predictRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/stats', statsRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/workers', workersRoutes);
app.use('/api/finances', financeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to your backend API!');
});

// Example of protecting an admin-only route
app.post('/api/items', verifyToken, isAdmin, (req, res) => {
  // Your code to add item here, only accessible by admin
  res.json({ message: 'Item added successfully by admin.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
