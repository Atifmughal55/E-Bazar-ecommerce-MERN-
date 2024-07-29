import mongoose, { connect } from "mongoose";

import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongodb database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (e) {
    console.log(`Errors in MongoDB ${e}`.bgRed.white);
  }
};

export default connectDB;
