import { useAuthState } from "../context/AuthProvider";
import axios from "axios";
import { useCallback } from "react";

export interface IEmployeeTypeProps {
  _id: string;
  uuid: number;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
  imageId: string;
  createDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function useEmployee() {
  const { profile } = useAuthState();
  const getAllEmployee = useCallback(async (): Promise<
    IEmployeeTypeProps[] | []
  > => {
    const config = {
      headers: { Authorization: `Bearer ${profile?.token}` },
    };
    const response = await axios.get("/employee/getAll", config);
    const data = response.data;
    return data.data;
  }, [profile]);
  const getEmployeeById = useCallback(
    async (id: string): Promise<IEmployeeTypeProps> => {
      const config = {
        headers: { Authorization: `Bearer ${profile?.token}` },
      };
      const response = await axios.get(`/employee/get/${id}`, config);
      const data = response.data;
      return data.data;
    },
    [profile]
  );
  const deleteEmployeeById = useCallback(
    async (id: string): Promise<IEmployeeTypeProps> => {
      const config = {
        headers: { Authorization: `Bearer ${profile?.token}` },
      };
      const response = await axios.delete(`/employee/delete/${id}`, config);
      const data = response.data;
      return data.data;
    },
    [profile]
  );
  const createEmployee = useCallback(
    async (user: any) => {
      const config = {
        headers: {
          Authorization: `Bearer ${profile?.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/employee/create", user, config);
      const data = response.data;
      return data.data;
    },
    [profile]
  );
  const updateEmployee = useCallback(
    async (id: string, user: any) => {
      const config = {
        headers: {
          Authorization: `Bearer ${profile?.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(`/employee/update/${id}`, user, config);
      const data = response.data;
      return data.data;
    },
    [profile]
  );

  return {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployeeById,
  };
}

export default useEmployee;
