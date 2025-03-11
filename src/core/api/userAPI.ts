import axios from "axios";
import { baseUrl } from "../constant";
import {
  CreatePermissionDto,
  CreateUserDto,
  HoldingWithAdminsOutputDto,
  PaginationData,
  PaginationParams,
  UserOutputDto,
  UserWithoutPermissionsOutputDto,
  MedcentersWithAdminsOutputDto,
  CreateMedCenterUserDto,
  CreateHoldingUserDto,
  PermissionEntityName,
  PermissionLevel,
  ServiceTypes,
} from "@/core/types";

export const addUser = async (
  body: CreateUserDto
): Promise<UserWithoutPermissionsOutputDto> => {
  const response = await axios.post<UserWithoutPermissionsOutputDto>(
    `${baseUrl}/users`,
    body
  );
  return response.data;
};
export const getUsers = async (
  params: PaginationParams
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/users`,
    { params }
  );
  return response.data;
};
export const getUser = async (userId: string): Promise<UserOutputDto> => {
  const response = await axios.get<UserOutputDto>(`${baseUrl}/users/${userId}`);
  return response.data;
};
export type DoctorsParams =
  | PaginationParams
  | {
      userId?: string;
      serviceId?: string;
      cabinetId?: string;
      medCenterId?: string;
      type?: ServiceTypes;
    };
export const getUsersByAdminHolding = async (
  params: DoctorsParams,
  holdingId: string
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/holdings/${holdingId}/users`,
    { params }
  );
  return response.data;
};
export const getDoctorsByHolding = async (
  params: DoctorsParams,
  holdingId: string
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/holdings/${holdingId}/doctors`,
    {
      params,
    }
  );
  return response.data;
};
export const getUsersByAdminMedCenter = async (
  params: PaginationParams,
  medCenterId: string,
  permissionLevel?: PermissionLevel
): Promise<PaginationData<UserOutputDto>> => {
  const newParams = {
    ...params,
    permissionLevel,
  };
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/med-centers/${medCenterId}/users`,
    { params: newParams }
  );
  return response.data;
};
export const getUsersByAdminDepartment = async (
  params: PaginationParams,
  medCenterId: string,
  departmentId: string
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/med-centers/${medCenterId}/departments/${departmentId}/users`,
    { params }
  );
  return response.data;
};
export const getUsersByAdminCallCenter = async (
  params: PaginationParams,
  holdingId: string
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.get<PaginationData<UserOutputDto>>(
    `${baseUrl}/holdings/${holdingId}/callcenter/users`,
    { params }
  );
  return response.data;
};
export const createAdminHolding = async (
  body: CreateHoldingUserDto,
  holdingId: string
): Promise<HoldingWithAdminsOutputDto> => {
  const response = await axios.post<HoldingWithAdminsOutputDto>(
    `${baseUrl}/holdings/${holdingId}/users`,
    body
  );
  return response.data;
};
export const appointAdminHolding = async (
  id: string,
  holdingId: string
): Promise<HoldingWithAdminsOutputDto> => {
  const adminId = { adminId: id };
  const response = await axios.patch<HoldingWithAdminsOutputDto>(
    `${baseUrl}/holdings/${holdingId}/set-admin`,
    adminId
  );
  return response.data;
};
export const createAdminMedCenter = async (
  body: CreateMedCenterUserDto,
  medCenterId: string
): Promise<MedcentersWithAdminsOutputDto> => {
  const response = await axios.post<MedcentersWithAdminsOutputDto>(
    `${baseUrl}/med-centers/${medCenterId}/users`,
    body
  );
  return response.data;
};
export const appointAdminMedcenter = async (
  adminId: string,
  medCenterId: string
): Promise<MedcentersWithAdminsOutputDto> => {
  const response = await axios.patch<MedcentersWithAdminsOutputDto>(
    `${baseUrl}/med-centers/${medCenterId}/set-med-center-admin`,
    { adminId }
  );
  return response.data;
};
export const createAdminDepartment = async (
  body: CreateMedCenterUserDto,
  medCenterId: string,
  departmentId: string
): Promise<PaginationData<UserOutputDto>> => {
  const response = await axios.post<PaginationData<UserOutputDto>>(
    `${baseUrl}/med-centers/${medCenterId}/departments/${departmentId}/users`,
    body
  );
  return response.data;
};
export const addPermission = async (
  userId: string,
  body: CreatePermissionDto
): Promise<UserOutputDto> => {
  const params: {
    [key: string]: string | PermissionLevel | PermissionEntityName | undefined;
  } = {};
  const {
    level,
    entityName,
    holdingId,
    medCenterId,
    departmentTypeId,
    jobPositionId,
  } = body;
  params.level = level;
  params.entityName = entityName;
  if (holdingId) params.holdingId = holdingId;
  if (medCenterId) params.medCenterId = medCenterId;
  if (departmentTypeId) params.departmentTypeId = departmentTypeId;
  if (jobPositionId) params.jobPositionId = jobPositionId;
  const response = await axios.post<UserOutputDto>(
    `${baseUrl}/users/${userId}/permission`,
    params
  );
  return response.data;
};
