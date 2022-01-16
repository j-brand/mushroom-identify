import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/db";
import { hashPassword } from "../../../helpers/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password }: { email: string; password: string } = data;

  if (!email || !email.includes("@") || !password || password.trim().length < 8) {
    res.status(422).json({ message: "Datenformat unzulässig (Das Passwort muss mindestes 8 Zeichen lang sein.)" });
    return;
  }
  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "Benutzer existiert bereits." });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({ email: email, password: hashedPassword, verified: false });

  if(result){

  }

  res.status(201).json({ message: "Benutzer wurde erstellt!" });
  client.close();
};
