import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import compression from 'compression';
import connectToDB from './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/api/products/index.js';
import userRoutes from './routes/api/user/index.js';
import cartRoutes from './routes/api/cart/index.js';
import userProfileRoutes from './routes/api/userProfile/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, 'server.log');

app.use(compression());

app.use(cors({
  origin: 'https://cleat-central-iwu8.onrender.com/',
  credentials: true,
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user-profile', userProfileRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(join(__dirname, '../frontend/dist')));
  app.use('/assets', express.static(join(__dirname, '../frontend/assets')));
  
  // Handle all other routes and return the React app
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist', 'index.html'));
  });
}

//Implementing FIle Logger
app.use(morgan(':method - :url - :date - :response-time ms'));
app.use(
  morgan(':method - :url - :date - :response-time ms', {
    stream: createWriteStream(logFile, { flags: 'a' }),
  })
);


Promise.resolve(connectToDB()).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});

