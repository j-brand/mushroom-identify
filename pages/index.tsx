import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mush Ident</title>
      </Head>
      <p>Home</p>
    </>
  );
};

export default Home;
