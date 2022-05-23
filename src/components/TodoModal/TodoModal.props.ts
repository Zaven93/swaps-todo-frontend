import React from "react";

import {
  TodoStateType,
  ActionType,
} from "../../contexts/TodoContext/TodoContext.props";

export type StatusType = "active" | "completed";

interface StateType {
  id: string | null;
  title: string | null;
  description: string | null;
  status: StatusType | null;
  todos?: any[];
  type?: "edit" | "create";
}

export interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleModal: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  state: StateType;
  dispatch?: React.Dispatch<ActionType>;
}
