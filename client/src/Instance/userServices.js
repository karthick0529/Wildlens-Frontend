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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
  
    return await protectedInstance.get('/users/logout', {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  // CRUD operations for reviews
  addReview: async (reviewText, rating, tourId) => {
    return await protectedInstance.post(`/reviews/review/${tourId}`, {
      reviewText,
      rating,
    }, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  getReviews: async (tourId) => {
    return await instance.get(`/reviews/${tourId}`, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  updateReview: async (reviewId, reviewText, rating) => {
    return await protectedInstance.put(`/reviews/review/${reviewId}`, {
      reviewText,
      rating,
    }, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  deleteReview: async (reviewId) => {
    return await protectedInstance.delete(`/reviews/review/${reviewId}`, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  createBooking: async (values, id) => {
    return await protectedInstance.post('/bookings/razorpay/order', values, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  verifyPayment: async (response) => {
    return await protectedInstance.post('/bookings/razorpay/verify', response, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  createUserBooking: async (bookingDetails) => {
    return await protectedInstance.post('/bookings/createbooking', bookingDetails, {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },

  getMyBookings: async () => {
    return await protectedInstance.get('/bookings/user', {
      headers: {
        "token": localStorage.getItem("token"),
      }
    });
  },
};
