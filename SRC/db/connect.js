import mongoose from "mongoose";

let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

export async function connectToDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const { MONGO_URL } = process.env;
        if (!MONGO_URL) throw new Error('Por favor define la variable de entorno MONGO_URI');
        cached.promise = mongoose.connect(MONGO_URL, { dbName: "Cluster0" })
            .then((m) => m.connection);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}