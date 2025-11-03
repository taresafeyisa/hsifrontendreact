import apiClient from "@/api/apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await apiClient.get("/user/get-users");
  return res.data;
};

export interface Role {
  id: number;
  name: string;
}

export const getRoles = async (): Promise<Role[]> => {
  const res = await apiClient.get("/user/get-roles");
  return res.data;
};
