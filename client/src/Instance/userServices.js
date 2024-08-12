import { instance, protectedInstance } from "./instance";

export const userServices = {
  register: async (values) => {
    return await instance.post("/users/register", values);
  },

  login: async (values) => {
    return await instance.post("/users/login", values, {
      withCredentials: true,
    });
  },

  logout: async () => {
    return await protectedInstance.get('/users/logout');
  },

  addReview: async (reviewText, tourRating, id) => {
    return await protectedInstance.post(`/review/${id}`, {
      reviewText,
      tourRating,
    });
  },

  createBooking: async (values, id) => {
    return await protectedInstance.post(`/bookings/razorpay/${id}`, values);
  },

  getMyBookings: async () => {
    return await protectedInstance.get('/bookings/user');
  },

  verifyPayment: async (response) => {
    return await protectedInstance.post('/bookings/razorpay/verify', response);
  },
};
