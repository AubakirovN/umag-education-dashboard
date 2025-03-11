import {
  LoginDto,
  SetPasswordDto,
} from "@/core/types";
import axios from "axios";
import { baseUrl } from "../constant";

export const login = async (body: LoginDto): Promise<any> => {
  const response = await axios.post<any>(
    `${baseUrl}/auth/login`,
    body
  );
  return response.data;
};

export const getUserInfo = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/auth/me`);
  return response.data;
};

export const setPassword = async (
  body: SetPasswordDto
): Promise<any> => {
  const response = await axios.post<any>(
    `${baseUrl}/auth/set-password`,
    body
  );
  return response.data;
};
