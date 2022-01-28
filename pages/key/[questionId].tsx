import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs/promises";

import History from "../../components/history";
import Question from "../../components/question";

import { IQuestion } from "../../types";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { connectToDatabase, findDocument } from "../../helpers/db";

interface Props {
  data: IQuestion;
}

const QuestionPage: NextPage<Props> = (props) => {
  const currentQuestion: IQuestion = props.data;

  return (
    <>
      <Head>
        <title>Frage Nr. {currentQuestion.id}</title>
      </Head>
      <h1>The Key</h1>
      <Question question={currentQuestion} />
      <History />
    </>
  );
};

async function getData(): Promise<IQuestion[]> {
  const client = await connectToDatabase();
  const rawData = await findDocument(client, "questions", {});

  return rawData!.toArray();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const paths = data.map((q: IQuestion) => ({
    params: { questionId: q.id.toString() },
  }));

  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  questionId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const questionId = +params.questionId;

  const data = await getData();
  const question = data.find((q: IQuestion) => q.id === questionId);

  return {
    props: {
      data: question,
    },
  };
};

export default QuestionPage;
