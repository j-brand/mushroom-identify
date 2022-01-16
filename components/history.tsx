import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import HistoryContext from "../store/history-context";
import HistoryIcon from "./icons/history-icon";

const History: FunctionComponent = () => {
  const historyCtx = useContext(HistoryContext);

  const historyClickHandler = (index: number) => () => {
    historyCtx.setIsOpen(false);
    historyCtx.goto(index);
  };

  return (
    <div className={`fixed right-0 top-24 md:top-28 max-w-[70%] transform transition-all z-10 ${historyCtx.windowOpen ? "translate-x-0" : "translate-x-full"}`}>
      <button onClick={() => historyCtx.toggle()} className="absolute p-4 border-t border-l border-b rounded-l-md bg-white transform translate-x-[-55px]">
        <HistoryIcon />
      </button>
      <div className="shadow-lg pl-10 pr-5 pt-5 rounded-bl-md float-right border  min-h-96 max-w-screen-4/5 bg-white">
        <h3 className="font-bold pb-3 text-xl">History</h3>

        {historyCtx.steps.length == 0 && <div className="italic py-5"><span>nothing here yet ...</span></div>}
        <ul className="pb-6">
          {historyCtx.steps.map((step, index) => {
            return (
              <li className="py-1" key={index}>
                <Link href={`/key/${step.question.id}`}>
                  <a onClick={historyClickHandler(index)}>{index + 1 + ".)" + step.answer.text.substr(3)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default History;
