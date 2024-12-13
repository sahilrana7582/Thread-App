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
    origin: 'http://localhost:5173',
    credentials: true,
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
