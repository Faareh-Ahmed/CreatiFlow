/**
 * In Next.js, API routes or server-side functions can be run in a serverless environment,
 * meaning they may be invoked frequently and independently. Opening a new MongoDB connection
 * on every invocation can quickly exhaust the available connections. To avoid this,
 * we cache the MongoDB connection using a global variable. This ensures that after the first
 * connection is made, subsequent invocations reuse the existing connection.
 */


import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// This global variable is shared across function invocations in development (and can be reused in production serverless environments)
let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}


/**
 * Connects to the MongoDB database using Mongoose.
 * This function checks the global cache first to see if a connection already exists.
 * If a connection exists, it reuses it; otherwise, it creates a new connection and caches it.
**/

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

// If no connection promise exists, start a new connection and store the promise in the cache.

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}