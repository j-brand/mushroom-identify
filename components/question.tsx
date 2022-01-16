import { useRouter } from "next/router";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import HistoryContext from "../store/history-context";
import { IAnswer, IQuestion } from "../types";

interface Props {
  question: IQuestion;
}

const Question: FunctionComponent<Props> = (props) => {
  const question = props.question;
  const historyCtx = useContext(HistoryContext);
  const router = useRouter();
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (question.id === 1 && first) {
      historyCtx.clear();
      setFirst(false);
    } else if (question.id != 1 && !first) {
      setFirst(true);
    }
  }, [first, historyCtx, question.id]);

  const answerCLickHandler = (answer: IAnswer) => () => {
    if (typeof answer.next == "string") {
      historyCtx.push({ question, answer });
      router.push(`/habitus/${answer.next}`);
    } else {
      historyCtx.push({ question, answer });
      historyCtx.setIsOpen(false);
      router.push(`/key/${answer.next}`);
    }
  };

  return (
    <div className="w-full md:max-w-sm mt-4 md:mt-12">
      <h3 className="font-bold text-xl">{question.text}</h3>

      <ul>
        {question.answers.map((answer, index) => (
          <li className="cursor-pointer hover:bg-gray-100 py-3 rounded-sm" key={index} onClick={answerCLickHandler(answer)}>
            {answer.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
