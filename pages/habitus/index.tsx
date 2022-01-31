import path from "path";
import fs from "fs/promises";

import React from "react";

import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { IHabitus } from "../../types/index";
import Head from "next/head";
import { connectToDatabase, findDocument } from "../../helpers/db";

interface Props {
  data: IHabitus[];
}

const HabitusList: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Habitus Übersicht</title>
      </Head>
      <h1>Habitus Übersicht</h1>
      <ul className="sm:columns-2 md:columns-4">
        {props.data.map((h: IHabitus, index: number, array: IHabitus[]) => {
          let firstBold: boolean = false;
          let sLetter: string = h.name.substring(0, 1);

          if (index === 0 || array[index - 1].name.substring(0, 1) !== sLetter) {
            firstBold = true;
          }

          return (
            <li key={h.id} className={`${firstBold ? " first-letter:font-bold" : ""}`}>
              <Link href={`/habitus/${h.id}`}>
                <a className="px-4 py-2 block text-xl hover:bg-gray-100 rounded-md">{h.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

async function getData(): Promise<IHabitus[]> {
  const client = await connectToDatabase();
  const rawData = await findDocument(client, "habitus", {});

  return rawData!.toArray();
}

export const getStaticProps: GetStaticProps = async () => {

  const data = await getData();

  //Filter Habitus (exclude not used Groups or dead ends from Key) + sort habitus in alphybetical order
  const filteredData = data
    .filter((habitus: IHabitus) => !habitus.id.startsWith("h0"))
    .sort(function (a: IHabitus, b: IHabitus) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  return {
    props: {
      data: filteredData,
    },
  };
};

export default HabitusList;
