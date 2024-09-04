import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import session from 'express-session';
import compression from 'compression';
import home from './routes/home/index.js';
import admin from './routes/admin/index.js';
import api from './routes/api/index.js';
import connectToDB from './db/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, 'server.log');

app.use(compression());
app.use('/assets', express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  '/admin',
  session({
    name: 'sessId',
    secret: app.get('env') === 'production' ? process.env.sessionSecret : '2bb375d5abe58776bbf28695',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get('env') === 'production' ? true : false,
      httpOnly: true,
      maxAge: 18000000, // 5 hours
    },
  })
);
app.use(morgan(':method - :url - :date - :response-time ms'));
app.use(
  morgan(':method - :url - :date - :response-time ms', {
    stream: createWriteStream(logFile, { flags: 'a' }),
  })
);

app.set('view engine', 'pug');

app.use('/', home);
app.use('/admin', admin);
app.use('/api', api);



Promise.resolve(connectToDB()).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});

