import axios from "axios";
import { baseUrl } from "../constant";
import { AddUserDto } from "../types";

export const addUser = async (body: AddUserDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/phone-roles`, body);
  return response.data;
};
export const getUsers = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/admin/users`);
  return response.data;
};
