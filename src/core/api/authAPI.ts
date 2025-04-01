import {
  LoginDto,
  RegisterDto,
} from "@/core/types";
import axios from "axios";
import { baseUrl } from "../constant";

export const login = async (body: LoginDto): Promise<any> => {
  const response = await axios.post<any>(
    `${baseUrl}/login`,
    body
  );
  return response.data;
};

export const getUserInfo = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/user`);
  return response.data;
};

export const register = async (
  body: RegisterDto
): Promise<any> => {
  const response = await axios.post<any>(
    `${baseUrl}/register`,
    body
  );
  return response.data;
};
