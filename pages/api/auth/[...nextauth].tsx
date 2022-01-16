import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MushIdent",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({ email: credentials!.email });
        if (!user) {
          client.close();
          throw new Error("Nutzer nicht gefunden");
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
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,

  }
});
