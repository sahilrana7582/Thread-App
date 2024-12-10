const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const url = process.env.DB_URL;
    await mongoose.connect(url);

    console.log('DB Connected');
  } catch (e) {
    console.log('Something Went Wrong', e);
  }
};

module.exports = dbConnect;
