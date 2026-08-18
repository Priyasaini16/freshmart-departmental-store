const API_URL = "https://freshmart-departmental-store.onrender.com/api/orders";

export const getAllOrders = async (token) => {
  const response = await fetch(`${API_URL}/admin/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data.orders;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await fetch(`${API_URL}/admin/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data.order;
};