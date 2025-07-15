import axios from "axios";
import { baseUrl } from "../constant";

export const getRoles = async (params?: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/roles`, { params });
  return response.data;
};

export const createRole = async (body: any) => {
  const response = await axios.post(`${baseUrl}/roles`, body);
  return response.data;
};

export const deleteRole = async (id: string): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/roles/${id}`);
  return response.data;
};

export const editRole = async (roleId: string, body: any) => {
  const response = await axios.put(`${baseUrl}/roles/${roleId}`, body);
  return response.data;
};