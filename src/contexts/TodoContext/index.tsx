import React, { useReducer, createContext, FC } from "react";

import {
  TodoStateType,
  ActionType,
  StatusType,
  TypeTuple,
} from "./TodoContext.props";

const initialState = {
  id: null,
  title: null,
  description: null,
  status: "active" as StatusType,
  todos: [],
  type: "create" as TypeTuple,
};

export const TodoContext = createContext<{
  state: TodoStateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: TodoStateType, action: ActionType): TodoStateType => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_ID":
      return {
        ...state,
        id: payload as string,
      };
    case "ADD_TITLE":
      return {
        ...state,
        title: payload as string,
      };
    case "ADD_DESCRIPTION":
      return {
        ...state,
        description: payload as string,
      };
    case "ADD_STATUS":
      return {
        ...state,
        status: payload as StatusType,
      };
    case "ADD_TODOS":
      return {
        ...state,
        todos: payload as any[],
      };
    case "ADD_TYPE":
      return {
        ...state,
        type: payload as TypeTuple,
      };
    default:
      return state;
  }
};

const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
