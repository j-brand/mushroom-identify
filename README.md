# Mushroom Identify

Mushroom Identify is a small private project that can be used to identify mushrooms faster.

## Background:

In order to expand my knowledge about the kingdom of mushrooms (Fungi), I attended a seminar with Dirk Harmel in Berlin.
The contents of the course were based on a script - "Reiseführer ins Reich der Pilze", which was also written by Dirk Harmel. Part of this book is an identification key that makes it possible to identify most of the mushrooms growing in my area. In this process, fungi are classified into various nonsystematic habit groups based on their characteristics. These habitus can appear then again in different mushroom genera. The aim of this key is therefore not to obtain a species in the end, but the genera in which the mushrooms with the desired habit occur. Then, using a more comprehensive reference book, the exact species can be determined.

Since the script unfortunately has an inconvenient format to carry with me in the field, I decided to transfer the identification key and the habit groups into a web application. I can then simply call these up with my smartphone.

To improve my web development skills as well and learn something new I decided to write my app in ReactJs.

Technologies and libraries used:

- [TypeScript](https://www.typescriptlang.org/)
- [ReactJs](https://reactjs.org/)
- [NextJs](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [MongoDB](https://www.mongodb.com/)

## Data
Since this app is based on the content of "Reiseführer ins Reich der Pilze" by Dirk Harmel and I have no right to publish this data, only dummy data can be used in this repository.

## Installation

### Requirements

- [NodeJs](https://nodejs.dev/)
- MongoDB Database 

### Setup MongoDB

1. Goto [MongoDB Atlas](https://www.mongodb.com/de-de/cloud/atlas/register) and start a free (Shared) plan.

2. Create a database User for the database you want to use.

3. Go to "Network Access" and add your IP address. Otherwise you will not be able to connect.

4. Go to "Databases", wait until your cluster is created and select your cluster.

5. click on "Connect to database" and select  "Connect your application"

6. Copy cluster name from "connection string" (e.g. mycluster.3vqmb.mongodb.net)

### SetUp App

1. Clone Repository

2. cd into root directory and run:
    npm install

3. Set environment variables

NextAuth parameters

    NEXTAUTH_URL​=<YOUR_LOCAL_URL>\/api\/auth

    NEXTAUTH_SECRET=<RANDOM STRING>

Your MongoDB cluster (Setup MongoDB 6.)

    MONGODB_CLUSTER=<CLUSTER_NAME>

If you do not have a database yet a Database with the given name will be created automatically.

    MONGODB_DATABASE=<DATABASE_NAME>

The username of your MongoDB user (Setup MongoDB 2.)    

    MONGODB_USER=<USERNAME>

Password of your MongoDB user (Setup MongoDB 2.)

    MONGODB_PASSWORD=<PASSWORD>


4. Create app user

 - Go to <YOUR APP URL>/login
 - switch to "registrieren"
 - insert username and passwort for your App user and click "registrieren"
 - go to your MonogoDB Cluster and search for your user inside the "user" collection
 - edit the Document and change the entry "verified" from false to true. Now you can Login with your user. (switch back to login and press "Login")

5. Migrate Dummy Data

- open ayour terminal and cd to the root directory of the application
- run:
     
        npm run migrate-dummy-data

