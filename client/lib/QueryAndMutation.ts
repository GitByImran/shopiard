import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentByEmail,
  getUserByEmail,
  getProuducts,
  deleteProduct,
  deleteUser,
  updateUser,
} from "./api";

export const useGetUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByEmail(email),
    enabled: !!email,
  });
};

export const useGetPaymentByEmail = (email: string) => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: () => getPaymentByEmail(email),
    enabled: !!email,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProuducts(),
  });
};

//

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { email: string; userData: any }) => {
      const { email, userData } = params;
      const response = await updateUser(email, userData);
      return response;
    },
    onSuccess: (data) => {
      console.log("User update successful:", data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.error("Error updating user data:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => deleteUser(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });
};
