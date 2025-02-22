const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://igapcricket.netlify.app'
  ],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

app.get("/", (req,res)=>{
  res.send("API is Running...")
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect("mongodb+srv://vky39:Shiv@2019@cluster0.i4i13.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Importing routes
const adminRoutes = require('./routes/adminRoutes');
const matchRoutes = require('./routes/matchRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
