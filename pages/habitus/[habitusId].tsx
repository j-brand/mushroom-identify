import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IHabitus } from "../../types/index";
import path from "path";
import fs from "fs/promises";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { connectToDatabase, findDocument } from "../../helpers/db";

interface Props {
  data: IHabitus;
}

const Habitus: NextPage<Props> = (props) => {
  const habitus: IHabitus = props.data;

  if (habitus.id.startsWith("h0")) {
    return <h1 className="">{habitus.text}</h1>;
  }

  return (
    <>
      <Head>
        <title>{habitus.name}</title>
      </Head>
      <div className="w-full max-w-sm md:max-w-7xl lg:px-8">
        <h1 className="mi-headline">{habitus.name}</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-left pb-2 text-xl">Merkmal</th>
              <th className="text-left pb-2 text-xl">Ausprägung</th>
            </tr>
          </thead>
          <tbody>
            {habitus.characteristics.map((c, index) => {
              return (
                <tr key={index}>
                  <td className={`${c.special ? "underline" : ""} font-medium py-2 align-text-top`}>{c.name}:</td>
                  <td className="px-4 py-2">{c.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*       <History />
         */}{" "}
      </div>
    </>
  );
};

async function getData(): Promise<IHabitus[]> {
  const client = await connectToDatabase();
  const rawData = await findDocument(client, "habitus", {});

  return rawData!.toArray();
}


export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const paths = data.map((habitus: IHabitus) => ({
    params: { habitusId: habitus.id },
  }));

  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  habitusId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const habitusId = params.habitusId;

  const data = await getData();
  const habitus = data.find((habitus: IHabitus) => habitus.id === habitusId);

  return {
    props: {
      data: habitus,
    },
  };
};

export default Habitus;
