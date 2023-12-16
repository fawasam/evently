import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://fawasam:Fawas1234@cluster0.islh4uv.mongodb.net/evently?retryWrites=true&w=majority";

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

  if (cached.promise) {
    console.log("connected");
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
