import { createContext, FunctionComponent, useState } from "react";
import { IQuestion, IAnswer } from "../types/index";

interface HistoryStep {
  question: IQuestion;
  answer: IAnswer;
}

interface historyContext {
  steps: HistoryStep[];
  windowOpen: boolean;
  setIsOpen: (value:boolean) => void;
  toggle: () => void;
  push: (step: HistoryStep) => void;
  pop: () => void;
  goto: (index: number) => void;
  clear: () => void;
}
const HistoryContextDefault = {
  steps: [],
  windowOpen: false,
  setIsOpen: () => {},
  toggle: () => {},
  push: () => {},
  pop: () => {},
  goto: () => {},
  clear: () => {},
};

const HistoryContext = createContext<historyContext>(HistoryContextDefault);

export const HistoryContextProvider: FunctionComponent = (props) => {
  const [steps, setSteps] = useState<HistoryStep[]>(HistoryContextDefault.steps);
  const [windowOpen, setWindowOpen] = useState<boolean>(HistoryContextDefault.windowOpen);

  const toggle = () => {
    setWindowOpen(!windowOpen);
  };

  const setIsOpen = (value: boolean) => {
    setWindowOpen(value);
  };
  const push = (step: HistoryStep) => {
    setSteps(steps.concat(step));
  };
  const pop = () => {
    setSteps(steps.slice(-1));
  };
  const goto = (index: number) => {
    let cut = steps.length - index;
    setSteps(steps.slice(0, -cut));
  };
  const clear = () => {
    setSteps([]);
  };

  const context = {
    steps,
    windowOpen,
    setIsOpen,
    toggle,
    push,
    pop,
    goto,
    clear,
  };

  return <HistoryContext.Provider value={context}>{props.children}</HistoryContext.Provider>;
};

export default HistoryContext;
