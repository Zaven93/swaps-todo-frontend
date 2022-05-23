import { FC } from "react";
import { Box, Heading, Text, Button, Badge } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { TodoProps } from "./Todo.props";

const Todo: FC<TodoProps> = ({ todo, populateTodo, deleteTodo, provided }) => {
  return (
    <Box
      width="80%"
      maxW="500px"
      minH="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg="#ffffff"
      mb="20px"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <Badge ml="auto" width="fit-content" variant="subtle" colorScheme="green">
        {todo?.status}
      </Badge>
      <Box>
        <Heading as="h1" size="md" mb="10px">
          {todo?.title}
        </Heading>
        <Text>{todo?.description}</Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          leftIcon={<EditIcon />}
          variant="solid"
          onClick={() => populateTodo(todo)}
        >
          Edit
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          variant="solid"
          onClick={() => deleteTodo(todo._id || "")}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
