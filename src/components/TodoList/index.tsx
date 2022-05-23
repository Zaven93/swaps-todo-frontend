//@ts-nocheck
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Button, Box } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TodoContext } from "../../contexts/TodoContext";
import { AuthContext } from "../../contexts/AuthContext";
import { TodoListProps } from "./TodoList.props";
import { logout } from "../../services/auth.service";
import { removeTodo } from "../../services/todo.service";
import Todo from "../Todo";

const TodoList: FC<TodoListProps> = ({ onOpen, todos }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TodoContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const populateTodo = (todo: {
    _id: string;
    title: string;
    description: string;
    status: "completed" | "active";
  }) => {
    dispatch({ type: "ADD_TYPE", payload: "edit" });
    dispatch({ type: "ADD_ID", payload: todo._id });
    dispatch({ type: "ADD_TITLE", payload: todo?.title });
    dispatch({ type: "ADD_DESCRIPTION", payload: todo?.description });
    dispatch({ type: "ADD_STATUS", payload: todo?.status });
    onOpen();
  };

  const deleteTodo = async (id: string) => {
    if (!id) return;
    try {
      await removeTodo(id);
      if (state.todos) {
        const filteredTodos = state.todos.filter((item) => item._id !== id);
        dispatch({ type: "ADD_TODOS", payload: filteredTodos });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    logout();
    authDispatch({ type: "SET_AUTH", payload: null });
    navigate("/login");
  };

  const onDragEnd = (result: any) => {
    const items = state.todos;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items?.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "ADD_TODOS", payload: items });
  };

  return (
    <VStack
      maxW={{ lg: "50%", sm: "100%" }}
      minH="100vh"
      spacing={4}
      align="center"
      bg="rgba(0,0,0,0.2)"
      ml="auto"
      mr="auto"
      p="20px"
    >
      <Box w="100%" display="flex" justifyContent="space-between">
        <Button onClick={onOpen}>
          <AddIcon />
        </Button>
        <Button onClick={signOut}>
          <CloseIcon mr="10px" /> Logout
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="to-dos">
          {(provided: any) => (
            <Box
              w="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos?.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <Todo
                      provided={provided}
                      populateTodo={populateTodo}
                      deleteTodo={deleteTodo}
                      dispatch={dispatch}
                      todo={todo}
                    />
                  )}
                </Draggable>
              ))}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </VStack>
  );
};

export default TodoList;
