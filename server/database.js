const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(db => console.log(`Database is connected.`))
  .catch(err => console.log(err));

module.exports = mongoose;
