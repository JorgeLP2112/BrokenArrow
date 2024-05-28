import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getOfert(req, res) {
    try {
        const id = req.query.id;
        await client.connect();
        const database = client.db('test');
        const ofert = await database
            .collection("ofertas")
            .findOne({ _id: new ObjectId(id) }, { projection: { _id: 0 } });
        const id_user = ofert.company_id;
        const profile = await database
            .collection("profiles")
            .findOne({ idUser: id_user }, { projection: { profilePicture: 1 } });
        ofert.profilePicture = profile.profilePicture;
        res.json(ofert);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function getOferts(res) {
    try {
        await client.connect();
        const database = client.db('test');
        const oferts = await database
            .collection("ofertas")
            .find().toArray();

        for (let i = 0; i < oferts.length; i++) {
            const profile = await database
                .collection("profiles")
                .findOne({ idUser: oferts[i].company_id }, { projection: { profilePicture: 1 } });
            oferts[i].profilePicture = profile.profilePicture;
        }

        res.json(oferts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function getMyOferts(req, res) {
    try {
        await client.connect();
        const id = req.query.idEmpresa;

        const database = client.db('test');
        const oferts = await database
            .collection("ofertas")
            .find({ company_id: id }).toArray();
        console.log(oferts);


        for (let i = 0; i < oferts.length; i++) {
            const profile = await database
                .collection("profiles")
                .findOne({ idUser: oferts[i].company_id }, { projection: { profilePicture: 1 } });
            oferts[i].profilePicture = profile.profilePicture;
        }

        res.json(oferts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function updateOfert(req, res) {
    try {
        const id = req.query.id;
        const updatedData = req.body; // Assuming the updated data is sent in the request body
        await client.connect();
        const database = client.db('test');
        const result = await database
            .collection("ofertas")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'No ofert found with the given id' });
        } else {
            res.status(200).json({ message: 'Ofert updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function createOfert(req, res) {
    try {

        const newOfert = req.body; // Assuming the new ofert data is sent in the request body
        await client.connect();
        const database = client.db('test');

        const profile = await database
            .collection("profiles")
            .findOne({ idUser: req.body.company_id }, { projection: { company_name: 1 } });
        newOfert.company_name = profile.company_name;
        const result = await database
            .collection("ofertas")
            .insertOne(newOfert);

        if (result.insertedCount === 0) {
            res.status(500).json({ error: 'Failed to create ofert' });
        } else {
            res.status(201).json({ message: 'Ofert created successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function aplicar(req, res) {
    try {
        const idUsuario = req.body.idUser;
        const id = req.query.id;
        await client.connect();
        const database = client.db('test');

        // Buscar en la colección "profiles" para obtener el nombre y apellido
        const profile = await database.collection("profiles").findOne({ idUser: idUsuario });

        if (!profile) {
            throw new Error('User profile not found');
        }

        // Unir el nombre y apellido en una sola cadena
        const fullName = `${profile.name} ${profile.lastname}`;

        // Actualizar la colección "ofertas"
        const result = await database.collection("ofertas").updateOne(
            { _id: new ObjectId(id) },
            { $push: { aplicantes: { id: idUsuario, Nombre: fullName, Email: profile.email, Telefono: profile.celphone } } }
        );
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'No ofert found with the given id' });
        } else {
            res.status(200).json({ message: 'Ofert updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

async function deleteOfert(req, res) {
    try {
        const id = req.query.id;
        await client.connect();
        const database = client.db('test');
        const result = await database
            .collection("ofertas")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.json({ message: 'Oferta eliminada con éxito' });
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while connecting to the database' });
    } finally {
        await client.close();
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.id !== undefined) {
        return getOfert(req, res);
    } else if (req.method === 'GET' && req.query.id === undefined && req.query.idEmpresa === undefined) {
        return getOferts(res);
    } else if (req.method === 'GET' && req.query.id === undefined && req.query.idEmpresa !== undefined) {
        return getMyOferts(req, res);
    } else if (req.method === 'PUT' && req.query.id !== undefined && req.query.aplicar === undefined) {
        return updateOfert(req, res);
    } else if (req.method === 'PUT' && req.query.id !== undefined && req.query.aplicar !== undefined) {
        return aplicar(req, res);
    } else if (req.method === 'POST') {
        return createOfert(req, res);
    } else if (req.method === 'DELETE') {
        return deleteOfert(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}