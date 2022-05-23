import { useRef, useState, FC } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
  Select,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { TodoModalProps } from "./TodoModal.props";
import { createTodo, editTodo } from "../../services/todo.service";

const TodoModal: FC<TodoModalProps> = ({
  isOpen,
  onClose,
  handleModal,
  state,
  dispatch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const initialRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const saveTodo = async (data: { [x: string]: any }) => {
    setLoading(true);
    try {
      let todo: any;

      if (state.type === "create") {
        todo = await createTodo({
          title: data.title,
          description: data.description,
          status: data.status,
        });
      }

      if (state.type === "edit") {
        todo = await editTodo({
          title: data.title,
          description: data.description,
          status: data.status,
          id: state.id as string,
        });
      }

      if (dispatch && Array.isArray(state.todos)) {
        const filteredTodos = state.todos.filter(
          (item) => item._id !== todo._id
        );
        dispatch({ type: "ADD_TITLE", payload: "" });
        dispatch({ type: "ADD_DESCRIPTION", payload: "" });
        dispatch({ type: "ADD_STATUS", payload: "active" });
        dispatch({ type: "ADD_TODOS", payload: [...filteredTodos, todo] });
      }
      setLoading(false);
      reset();
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      reset();
      onClose();
    }
  };

  const { ref: titleRef, onBlur: onTitleBlur } = register("title", {
    required: true,
  });
  const { ref: descRef, onBlur: onDescBlur } = register("description", {
    required: true,
  });

  const renderButton = () => (state.type === "edit" ? "Edit" : "Save");

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create todo</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(saveTodo)}>
          <ModalBody pb={6}>
            <FormControl mb="10px">
              <FormLabel>Title</FormLabel>
              <Input
                ref={(ref) => {
                  initialRef.current = ref;
                  return titleRef(ref);
                }}
                onBlur={onTitleBlur}
                placeholder="Title"
                onChange={handleModal}
                name="title"
                value={state.title || ""}
              />
              {errors?.title?.type === "required" && (
                <Text textAlign="left" color="red">
                  Title is required
                </Text>
              )}
            </FormControl>
            <FormControl mb="10px">
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={(ref: any) => {
                  return descRef(ref);
                }}
                onBlur={onDescBlur}
                placeholder="Description"
                onChange={handleModal}
                name="description"
                value={state.description || ""}
              />
              {errors?.description?.type === "required" && (
                <Text textAlign="left" color="red">
                  Description is required
                </Text>
              )}
            </FormControl>
            <FormControl mb="10px">
              <FormLabel>Status</FormLabel>
              <Select
                {...register("status", { required: true })}
                onChange={handleModal}
                name="status"
                value={state.status as string}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {loading ? <Spinner /> : renderButton()}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TodoModal;
