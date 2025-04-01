import axios from "axios";
import { baseUrl } from "../constant";

export const getCourses = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses`);
  return response.data;
};
export const getCourse = async (id: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/${id}`);
  return response.data;
};
export const getCourseBlocks = async (id: string): Promise<any> => {
  const response = await axios.get<any>(
    `${baseUrl}/course-blocks?course-id=${id}`
  );
  return response.data;
};
export const createCourse = async (body: any) => {
  const response = await axios.post(`${baseUrl}/courses`, body);
  return response.data;
};
export const createBlock = async (body: any) => {
  const response = await axios.post(`${baseUrl}/course-blocks`, body);
  return response.data;
};
export const getBlock = async (id: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/course-blocks/${id}`);
  return response.data;
};
export const getLessons = async (id: string) => {
  const response = await axios.get(`${baseUrl}/lessons?course-block-id=${id}`);
  return response.data;
};
export const createLesson = async (body: any): Promise<any> => {
  const response = await axios.post(`${baseUrl}/lessons`, body);
  return response.data;
};
