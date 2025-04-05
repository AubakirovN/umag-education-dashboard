import axios from "axios";
import { baseUrl } from "../constant";

export const getCourses = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses`, { params });
  return response.data;
};
export const getCourse = async (id: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/${id}`);
  return response.data;
};
export const deleteCourse = async (id: string): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/courses/${id}`);
  return response.data;
};
export const getCourseBlocks = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/course-blocks`, { params });
  return response.data;
};
export const getCourseBlocksById = async (
  id: string,
  params: any
): Promise<any> => {
  const response = await axios.get<any>(
    `${baseUrl}/course-blocks?course-id=${id}`,
    { params }
  );
  return response.data;
};
export const deleteCourseBlock = async (id: string): Promise<any> => {
  const response = await axios.delete<any>(`${baseUrl}/course-blocks/${id}`);
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
export const getLessons = async (params: any) => {
  const response = await axios.get(`${baseUrl}/lessons`, {
    params,
  });
  return response.data;
};
export const getLessonsById = async (id: string, params: any) => {
  const response = await axios.get(`${baseUrl}/lessons?course-block-id=${id}`, {
    params,
  });
  return response.data;
};
export const getLesson = async (id: string) => {
  const response = await axios.get(`${baseUrl}/lessons/${id}`);
  return response.data;
};
export const deleteLesson = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/lessons/${id}`);
  return response.data;
};
export const createLesson = async (body: any): Promise<any> => {
  const response = await axios.post(`${baseUrl}/lessons`, body);
  return response.data;
};
export const createTest = async (body: any): Promise<any> => {
  const response = await axios.post(`${baseUrl}/test-questions`, body);
  return response.data;
};
export const getTests = async (params: any): Promise<any> => {
  const response = await axios.get(`${baseUrl}/test-questions`, { params });
  return response.data;
};
export const deleteTest = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/test-questions/${id}`);
  return response.data;
}
