import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('test'); // replace with your database name

        const activeUsers = await database
            .collection("users")
            .find({}, { projection: { _id: 0, name: 1, email: 1 } })
            .toArray();

        res.json(activeUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}