export const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`/api/database/user?email=${email}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getPaymentByEmail = async (email: string) => {
  try {
    const response = await fetch(`/api/database/payment?email=${email}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProuducts = async () => {
  try {
    const response = await fetch(`/api/database/product`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//

export const updateUser = async (email: string, userData: any) => {
  try {
    const response = await fetch(`/api/database/user?email=${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    return response;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
//

export const deleteUser = async (email: string) => {
  try {
    const response = await fetch(`/api/database/user?email=${email}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`/api/database/product?id=${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
