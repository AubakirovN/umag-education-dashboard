import axios from "axios";
import { baseUrl } from "../constant";
import { AddUserDto } from "../types";

export const addUser = async (body: AddUserDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/phone-roles`, body);
  return response.data;
};
export const importUsers = async (file: any): Promise<any> => {
  const response = await axios.post<any>(
    `${baseUrl}/import-phones-roles`,
    { file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const getUsers = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/users`, { params });
  return response.data;
};
