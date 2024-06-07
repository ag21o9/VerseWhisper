const mongoose = require("mongoose");
var mongoDB = process.env.CONNECTION_STRING;

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(mongoDB);
    // console.log(
    //   "DATABASE CONNECTED : ",
    //   connect.connection.host,
    //   connect.connection.name
    // );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
