import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function updateRol(req, res) {
    try {
        const { userId, userType } = req.body;
        await client.connect();
        const database = client.db('test');
        const result = await database
            .collection("users")
            .updateOne(
                { _id: new ObjectId(userId) },
                { $set: { "roles.1": userType } }
            );

        if (result.matchedCount === 1) {
            res.status(200).json({ message: 'Rol actualizado con éxito' });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el rol del usuario' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return updateRol(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}