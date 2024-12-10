const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./utils/dbConnect');
dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is Live On the ${PORT}`);
});
