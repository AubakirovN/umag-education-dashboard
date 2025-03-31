import axios from "axios";
import { baseUrl } from "../constant";
import { AddUserDto } from "../types";

export const addUser = async (body: AddUserDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/phone-roles`, body);
  console.log(response);
  return response.data;
};
