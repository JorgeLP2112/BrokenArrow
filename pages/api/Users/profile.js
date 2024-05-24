import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getUser(req, res) {
    try {
        const id = req.query.profile;
        await client.connect();
        const database = client.db('test');
        const user = await database
            .collection("profiles")
            .findOne({ idUser: id });
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
        await client.connect(); // Connect to MongoDB before running operations
        const database = client.db('test');
        const userType = req.query.type;
        const userName = req.query.name;
        const query = {};
        if (userType) query.type = { $eq: userType };
        if (userName) query.name = { $regex: new RegExp(userName, "i") };
        const users = await database
            .collection("profiles")
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
    try {
        let result;  // Define result here
        const idUser = req.body.id;
        await client.connect();
        const database = client.db('test');
        if (req.body.type === "Empresa") {
            const { company_name, company_description, industry, location, website, contact_information, profilePicture, type
            } = req.body;
            result = await database.collection("profiles").insertOne({ idUser, company_name, company_description, industry, location, website, contact_information, profilePicture, type });  // Assign a value to result here
        } else {
            const { about, name, lastname, education, work_experience, skills, projects,
                languages, certifications, soft_skills, career_goals, profilePicture, type
            } = req.body;
            result = await database.collection("profiles").insertOne({
                idUser, about, name, lastname, education, work_experience, skills, projects,
                languages, certifications, soft_skills, career_goals, profilePicture, type
            });  // Assign a value to result here
        }

        // Now result is available here
        if (result.acknowledged && result.insertedId) {
            const id = new ObjectId(idUser);
            let updateFields = { isNewUser: false };

            if (req.body.type === "Empresa") {
                updateFields.active = false;
            }

            const updateResult = await database.collection("users").updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields }
            );

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

/*
async function deleteUser(req, res) {
    console.log(req.body);
    const { id } = req.body;
    try {
        console.log(id);
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
*/
export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.profile !== undefined) {
        return getUser(req, res);
    } else if (req.method === 'GET' && req.query.profile === undefined) {
        return getUsers(req, res);
    } else if (req.method === 'POST') {
        return newUser(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}