const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./utils/dbConnect');
dotenv.config();
const app = express();
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/postRoutes');

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://thread-app-tau-gules.vercel.app',
      'https://thread-app-sahilrana27582s-projects.vercel.app',
      'https://thread-app-git-main-sahilrana27582s-projects.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    secure: true,
    sameSite: 'none',
  })
);

app.use(cookieParser());
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is Live On the ${PORT}`);
});
