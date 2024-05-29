import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const reporte = req.body;
            await client.connect();
            const database = client.db('test');
            const result = await database
                .collection("reportes")
                .insertOne(reporte);

            if (result.insertedCount === 0) {
                res.status(500).json({ error: 'Failed to create report' });
            } else {
                res.status(201).json({ message: 'Ofert created report' });
            }
        } catch (error) {

        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}