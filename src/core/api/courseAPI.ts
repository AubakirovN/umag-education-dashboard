import axios from "axios";
import { baseUrl } from "../constant";

export const getCourses = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses`);
  return response.data;
};
export const createCourse = async (body: any) => {
  const response = await axios.post(`${baseUrl}/courses`, body);
  return response.data;
};
