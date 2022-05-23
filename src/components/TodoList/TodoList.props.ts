type TodoType = {
  title: string;
  description: string;
  status: "completed" | "active";
  _id: string;
};

export interface TodoListProps {
  onOpen: () => void;
  todos: TodoType[];
}
