import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getUser(req, res) {
    try {
        const id = req.query.oferta;
        await client.connect();
        const database = client.db('test');
        const user = await database
            .collection("ofertas")
            .findOne({ _id: id });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function getUsers(req, res) {
    try {
        await client.connect();
        const database = client.db('test');
        const type = req.query.categoria;
        const empresa = req.query.empresa;
        const query = {};
        if (type) query.type = { $eq: type };
        if (empresa) query.name = { $regex: new RegExp(empresa, "i") };
        const users = await database
            .collection("ofertas")
            .find(query).toArray();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function newUser(req, res) {
    const { query: { idUser } } = req;

    const { about, name, lastname, education, work_experience, skills, projects,
        languages, certifications, soft_skills, career_goals, profilePicture, type
    } = req.body;

    try {
        await client.connect();
        const database = client.db('test');
        const result = await database.collection("profiles").insertOne({ idUser, name, lastname, about, education, work_experience, skills, projects, languages, certifications, soft_skills, career_goals, profilePicture, type });
        if (result.acknowledged && result.insertedId) {
            const id = new ObjectId(idUser);

            const updateResult = await database.collection("users").updateOne({ _id: id }, { $set: { isNewUser: false } });
            req.session.user.isNewUser = false;

            if (updateResult.acknowledged && updateResult.modifiedCount === 1) {
                res.json({ message: 'User added successfully and isNewUser updated' });
                console.log('User added successfully and isNewUser updated');
            } else {
                res.status(500).json({ error: 'An error occurred while updating the user in the database' });
                console.log('An error occurred while updating the user in the database');
            }
        } else {
            res.status(500).json({ error: 'An error occurred while inserting the user into the database' });
            console.log('An error occurred while inserting the user into the database');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.oferta !== undefined) {
        return getUser(req, res);
    } else if (req.method === 'GET' && req.query.categorias === undefined) {
        return getUsers(req, res);
    } else if (req.method === 'POST') {
        return newUser(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}