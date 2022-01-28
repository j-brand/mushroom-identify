import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, findDocument, findOneDocument, insertDocument } from "../../../helpers/db";
import { hashPassword } from "../../../helpers/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password }: { email: string; password: string } = data;

  if (!email || !email.includes("@") || !password || password.trim().length < 8) {
    res.status(200).json({ message: "Datenformat unzulässig (Das Passwort muss mindestes 8 Zeichen lang sein.)" });
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Verbindung zur Datenbank ist fehlgeschlagen!" });
    return;
  }

  try {
    const existingUser = await findOneDocument(client, "users", { email: email });
    if (existingUser) {
      res.status(422).json({ message: "Benutzer existiert bereits." });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const userAdded = await insertDocument(client, "users", { email: email, password: hashedPassword, verified: false });
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Benutzer konnte nicht angelegt werden." });
    return;
  }

  res.status(201).json({ message: "Benutzer wurde erstellt!" });
};
