import axios from "axios";

import { BASE_URL } from "../constants/index";
import { TodoStateType } from "../contexts/TodoContext/TodoContext.props";
import { getAuthHeaders } from "./auth.service";

export const createTodo = async ({
  title,
  description,
  status,
}: TodoStateType) => {
  if (!title || !description || !status) return;
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/todo`,
      {
        title,
        description,
        status,
      },
      {
        headers: getAuthHeaders(),
      }
    );

    return data?.todo;
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/todo`, {
      headers: getAuthHeaders(),
    });

    return data?.todos;
  } catch (error) {
    console.log(error);
  }
};

export const editTodo = async ({
  title,
  description,
  status,
  id,
}: {
  title?: string;
  description?: string;
  status?: "completed" | "active";
  id: string;
}) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/todo/${id}`,
      { title, description, status },
      {
        headers: getAuthHeaders(),
      }
    );

    return data?.updatedTodo;
  } catch (error) {
    console.log(error);
  }
};

export const removeTodo = async (id: string) => {
  console.log("Remove is is", id);
  if (!id) return;
  try {
    const { data } = await axios.delete(`${BASE_URL}/api/todo/${id}`);

    return data.removedTodo;
  } catch (error) {
    console.log(error);
  }
};
