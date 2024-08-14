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

  // CRUD operations for reviews
  addReview: async (reviewText, rating, tourId) => {
    return await protectedInstance.post(`/reviews/review/${tourId}`, {
      reviewText,
      rating,
    });
  },

  getReviews: async (tourId) => {
    return await instance.get(`/reviews/${tourId}`);
  },

  updateReview: async (reviewId, reviewText, rating) => {
    return await protectedInstance.put(`/reviews/review/${reviewId}`, {
      reviewText,
      rating,
    });
  },
  

  deleteReview: async (reviewId) => {
    return await protectedInstance.delete(`/reviews/review/${reviewId}`);
  },

  createBooking: async (values, id) => {
    return await protectedInstance.post('/bookings/razorpay/order', values);
  },

  verifyPayment: async (response) => {
    return await protectedInstance.post('/bookings/razorpay/verify', response);
  },

  createUserBooking: async (bookingDetails) => {
    return await protectedInstance.post('/bookings/createbooking', bookingDetails);
  },

  getMyBookings: async () => {
    return await protectedInstance.get('/bookings/user');
  },
};
