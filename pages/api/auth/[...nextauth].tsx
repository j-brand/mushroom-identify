import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase, findDocument } from "../../../helpers/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MushIdent",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let user;
        let client;
        try {
          client = await connectToDatabase();
          user = await findDocument(client, "users", { email: credentials!.email });
        } catch (error) {
          throw new Error("Fehler bei der Verbindung!");
        }
        if (!user) {
          client.close();
          throw new Error("Nutzer nicht gefunden oder nicht berechtigt");
        }

        if (user.verified === false) {
          client.close();
          throw new Error("Nutzer nicht gefunden oder nicht berechtigt");
        }

        const isValid = await verifyPassword(credentials!.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error("flasches Passwort");
        }

        client.close();
        return { email: user.email };

        // Add logic here to look up the user from the credentials supplied
      },
    }),
  ],
  // A secret to use for key generation. Defaults to the top-level `secret`.
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
});
