import {
  LoginDto,
  LoginOutputDto,
  SetPasswordDto,
  SetPasswordOutputDto,
  UserOutputDto,
} from "@/core/types";
import axios from "axios";
import { baseUrl } from "../constant";

export const login = async (body: LoginDto): Promise<LoginOutputDto> => {
  const response = await axios.post<LoginOutputDto>(
    `${baseUrl}/auth/login`,
    body
  );
  return response.data;
};

export const getUserInfo = async (): Promise<UserOutputDto> => {
  const response = await axios.get<UserOutputDto>(`${baseUrl}/auth/me`);
  return response.data;
};

export const setPassword = async (
  body: SetPasswordDto
): Promise<SetPasswordOutputDto> => {
  const response = await axios.post<SetPasswordOutputDto>(
    `${baseUrl}/auth/set-password`,
    body
  );
  return response.data;
};
