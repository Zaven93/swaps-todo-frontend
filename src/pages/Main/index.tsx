import React, { useContext, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { TodoContext } from "../../contexts/TodoContext";
import { getTodos } from "../../services/todo.service";
import TodoList from "../../components/TodoList";
import TodoModal from "../../components/TodoModal";

const MainPage = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModal = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) =>
    dispatch({
      type: `ADD_${e.target.name.toUpperCase()}`,
      payload: e.target.value,
    });

  useEffect(() => {
    getTodos()
      .then((todos) => {
        dispatch({ type: "ADD_TODOS", payload: todos || [] });
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <TodoList todos={state.todos || []} onOpen={onOpen} />
      <TodoModal
        state={state as any}
        dispatch={dispatch}
        handleModal={handleModal}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default MainPage;
