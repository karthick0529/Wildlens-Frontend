import { protectedInstance } from "./instance";


export const adminServices = {

    createTour: async (name, description, city, address, distance, photo, maxGroupSize, price, isAvailable) => {
      return await protectedInstance.post("/tours", {
        name, description, city, address, distance, photo, maxGroupSize, price, isAvailable
      }, {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
  
    getTours: async () => {
      return await protectedInstance.get("/admin/tours", {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
  
    getTourById: async (id) => {
      return await protectedInstance.get(`/tours/${id}`, {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
  
    updateTour: async (name, description, city, address, distance, photo, maxGroupSize, price, isAvailable, id) => {
      return await protectedInstance.put(`/tours/${id}`, {
        name, description, city, address, distance, photo, maxGroupSize, price, isAvailable
      }, {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
  
    deleteTour: async (id) => {
      return await protectedInstance.delete(`/tours/${id}`, {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
  
    getBookings: async () => {
      return await protectedInstance.get("/bookings/", {
        headers: {
          "token": localStorage.getItem("token"),
        }
      });
    },
}    