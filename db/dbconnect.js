import mongoose from "mongoose";

const connection = {};

// async function dbConnect() { // function traditional syntax
const dbConnect = async () => {
  /// arrow function async syntax
  if (connection.isConnected) return;
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
