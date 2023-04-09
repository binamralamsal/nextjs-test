/*
 * This whole file is copy pasted from: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 * This is the recommended way to connect to MongoDB with Next.js.
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// It is validating if MONGODB_URI is in env.local or not
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

// If mongodb connection is not cached, it will create null value for it.
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  // if it's already cached it will return cached value
  if (cached.conn) {
    return cached.conn;
  }

  // if it's not cached, it will create new promise for .connect
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // It will get mongoose connection from cached promise
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
