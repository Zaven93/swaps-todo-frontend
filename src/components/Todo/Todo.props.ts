import React from "react";

type TodoType = {
  title: string;
  description: string;
  status: "completed" | "active";
  _id: string;
};

export interface TodoProps {
  todo: TodoType;
  dispatch?: React.Dispatch<any>;
  populateTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  provided: any;
}
