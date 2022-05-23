import axios, { AxiosRequestHeaders } from "axios";

import { BASE_URL } from "../constants/index";

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string; message?: string }> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/user/register`, {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    return data as { token: string };
  } catch (error: any) {
    console.log(error);
    return { token: "", message: error.response.data.message };
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string; message?: string }> => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/user/login`, {
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    return data as { token: string };
  } catch (error: any) {
    return { token: "", message: error.response.data.message };
  }
};

export const getAuthHeaders = (): AxiosRequestHeaders => {
  // Set this to whatever the minimum token length should be (if you know)
  // Otherwise, you can leave at 1 for "not an empty string"
  const minTokenLength = 1;

  try {
    const token: string | null = localStorage.getItem("token");

    // Abort if token is not string and min length
    if (!(typeof token === "string" && token.length >= minTokenLength)) {
      throw new Error("Invalid user access token");
    }

    // I left this here because it seems like you weren't sure about which format you need:
    // return {Authorization: `Bearer ${accessToken}`};

    // Return headers object
    return { "x-access-token": token };
  } catch {
    // Catch any errors and return an empty headers object
    return {};
  }
};

export const logout = () => localStorage.removeItem("token");
