import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Replace the uri string with your connection string.
export async function POST(req) {

    const body = await req.json()

    const uri = process.env.MONGODB
    const client = new MongoClient(uri);

    try {
        const database = client.db('users');
        const info = database.collection('info');

        // Query for a movie that has the title 'Back to the Future'
        const users = await info.insertOne(body);
        return NextResponse.json({res:"data received",status:200})
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
