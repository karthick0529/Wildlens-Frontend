import { protectedInstance } from "./instance";


export const adminServices = {

    createTour: async ( name, description,city,address,distance,photo,maxGroupSize,price,isAvailable) => {
        
        return await protectedInstance.post("/tours",{
            name, description,city,address,distance,photo,maxGroupSize,price,isAvailable
        })
    },

    getTours: async() => {
        return await protectedInstance.get("/admin/tours")
    },

    getTourById: async(id) => {
        return await protectedInstance.get(`/tours/${id}`)
    },

    updateTour: async ( name, description,city,address,distance,photo,maxGroupSize,price,isAvailable,id) => {
        return await protectedInstance.put(`/tours/${id}`,{
            name, description,city,address,distance,photo,maxGroupSize,price,isAvailable
        })
    },

     deleteTour : async (id) => {
        return await protectedInstance.delete(`/tours/${id}`)
     },
     getBookings: async() => {
        return await protectedInstance.get("/bookings")
    },
} 