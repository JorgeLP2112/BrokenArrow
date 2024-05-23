import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getReportes(req, res) {
    try {
        await client.connect();

        const database = client.db('test');
        const reporteType = req.query.type;
        const query = {};
        if (reporteType) query.reporteType = { $eq: reporteType };

        const reportes = await database
            .collection("reportes")
            .find(query)
            .toArray();

        res.json(reportes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.body;
    try {
        await client.connect();
        const database = client.db('test');
        const result = await database.collection("users").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.json({ message: 'User deleted successfully' });
            console.log('User deleted successfully');
        } else {
            res.status(404).json({ error: 'User not found' });
            console.log('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function modifyUser(req, res) {
    const { id, name, email, rol } = req.body;
    try {
        await client.connect();
        const database = client.db('test');
        const result = await database.collection("users").updateOne(
            {  _id: new ObjectId(id) },
            { $set: { name, email, roles: [rol] } }
        );
        if (result.modifiedCount === 1) {
            res.json({ message: 'User updated successfully' });
            console.log('User updated successfully');
        } else {
            res.status(404).json({ error: 'User not found' });
            console.log('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getReportes(req, res);
    }

    if (req.method === 'DELETE') {
        return deleteUser(req, res);
    }

    if (req.method === 'PUT') {
        return modifyUser(req, res);
    }

    // Si el método no es GET, DELETE, o PUT, retornamos un error
    res.status(405).end(); // Method Not Allowed
}