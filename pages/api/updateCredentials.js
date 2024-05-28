import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function updateCredentials(req, res) {
  try {
    const { userId, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.connect();
    const database = client.db("test");
    const result = await database
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username, password: hashedPassword } }
      );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: "Credenciales actualizadas con éxito" });
    } else {
      res
        .status(500)
        .json({
          message: "No se pudo actualizar las credenciales del usuario",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while connecting to the database" });
  } finally {
    await client.close();
  }
}

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    return updateCredentials(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
