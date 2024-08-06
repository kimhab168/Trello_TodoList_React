// step1: create context

import { createContext, ReactNode, useContext, useState } from "react";

interface TodosProviderProps {
  children: ReactNode;
}
type isActionForm = "input" | "view" | "close";
interface FormType {
  isActForm: isActionForm;
  setActForm: (value: isActionForm) => void;
  isGetID: string;
  setGetID: (value: string) => void;
}
export const TodosContext = createContext<FormType | undefined>(undefined);
// export const TodosContext = createContext({});

// step2: create provider context
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [isActForm, setActForm] = useState<isActionForm>("close");
  const [isGetID, setGetID] = useState<string>("");

  return (
    <TodosContext.Provider value={{ isActForm, setActForm, isGetID, setGetID }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = (): FormType => {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("TodosContext was used outside the TodosProvider");
  return context;
};
