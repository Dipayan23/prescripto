import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.config.js';
import connectCloudinary from './config/cloudinary.config.js';
import adminRouter from './routes/admin.route.js';


// App Config
const app = express();
const PORT = process.env.PORT || 5000;
// Database Connection
connectDB().catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
})

// Cloudinary Configuration
connectCloudinary().catch(err => {
    console.error('Cloudinary connection error:', err);
    process.exit(1); // Exit the process if the Cloudinary connection fails
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Prescripto Backend!');
});

//Admin Routes
app.use('/api/admin', adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});