import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IGenus, IHabitus } from "../../types/index";
import path from "path";
import fs from "fs/promises";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { connectToDatabase, findDocument, findOneDocument } from "../../helpers/db";
import History from "../../components/history";

interface Props {
  habitus: IHabitus;
  genera: IGenus[];
}

const Habitus: NextPage<Props> = (props) => {
  const habitus: IHabitus = props.habitus;
  const genera: IGenus[] = props.genera;

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

        <div className="px-4">
          <div className="pt-5 pb-14 text-xl">
            <span>Dieser Habitus kommt in folgenden Gruppen vor:</span>
            <ul className="font-bold mt-4">
              {genera.map((g, index) => (
                <li key={index}>{g.name}</li>
              ))}
            </ul>
          </div>

          <table className="table-auto">
            <thead className="border-b">
              <tr>
                <th className="text-left pb-2">Merkmal</th>
                <th className="text-left pb-2 pl-4">Ausprägung</th>
              </tr>
            </thead>
            <tbody>
              {habitus.characteristics.map((c, index) => (
                <tr key={index} className="border-b">
                  <td className={`${c.special ? "underline" : ""} font-medium py-2 align-text-top`}>{c.name}:</td>
                  <td className="px-4 py-2">{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <History />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await connectToDatabase();
  const rawData = await findDocument(client, "habitus", {});

  const data = await rawData!.toArray();

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

  const client = await connectToDatabase();

  const habitus = await findOneDocument(client, "habitus", { id: habitusId });

  let genera = [];

  if (habitus) {
    const generaIDs = await habitus.genera;
    const rawGenera = await findDocument(client, "genera", { id: { $in: generaIDs } });
    genera = await rawGenera!.toArray();
  }

  return {
    props: {
      habitus: habitus,
      genera: genera,
    },
  };
};

export default Habitus;
