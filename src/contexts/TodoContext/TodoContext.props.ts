export type StatusType = "active" | "completed";

export type TypeTuple = "edit" | "create";

export interface TodoStateType {
  id?: string | null;
  title: string | null;
  description: string | null;
  status: StatusType | null;
  todos?: any[];
  type?: TypeTuple;
}

export interface ActionType {
  type: string;
  payload: StatusType | string | any[] | boolean;
}
