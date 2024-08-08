import React, { useEffect, useState } from 'react'
import './createTour.css'
import { adminServices } from '../Instance/adminServices';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTour = () => {

    const { id } = useParams();

    

    useEffect(()=>{
        adminServices.getTourById(id)
        .then((res)=>{
            setName(res.data.name);
          setDescription(res.data.description);
          setCity(res.data.city);
          setAddress(res.data.address);
          setDistance(res.data.distance);
          setPhoto(res.data.photo);
          setMaxGroupSize(res.data.maxGroupSize);
          setPrice(res.data.price);
          setIsAvailable(res.data.isAvailable);
            // alert(res.data.message)
            })
        .catch((err)=>{toast.error(err.message)});
    },[id])
   
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [distance, setDistance] = useState("");
    const [photo, setPhoto] = useState("");
    const [maxGroupSize, setMaxGroupSize] = useState("");
    const [price, setPrice] = useState("");
    const [isAvailable, setIsAvailable] = useState("");
  
    const handleClick = async (e) => {
      e.preventDefault();
  
      adminServices
        .updateTour(
          name,
          description,
          city,
          address,
          distance,
          photo,
          maxGroupSize,
          price,
          isAvailable,id
        )
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setDescription("");
          setCity("");
          setAddress("");
          setDistance("");
          setPhoto("");
          setMaxGroupSize("");
          setPrice("");
          setIsAvailable("");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
  return (
    <>
    <section >
      <div className="container form ">
        <div className="row g-3 mt-4">
          <div className="col md-3">
            <div className="card ct-card">
              <h1 className="card-header d-flex justify-content-center py-5">
                Update Tour
              </h1>
              <div className="card-body ct-card-body">
                <form onSubmit={handleClick}>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col ">
                        <label htmlFor="name">Title</label>
                      <input
                        type="text"
                        className="form-control ct-fc"
                        placeholder="Title"
                        aria-label="Title"
                        required
                        value={name}
                         onChange={(e)=> setName(e.target.value)}
                      />
                    </div>
                    <div className="col ph">
                    <label htmlFor="name">City</label>
                      <input
                        type="text"
                        className="form-control ct-fc"
                        placeholder="City"
                        aria-label="City"
                        required
                        value={city}
                        onChange={(e)=> setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col">
                    <label htmlFor="name">Address</label>
                      <input
                        type="text"
                        className="form-control ct-fc"
                        placeholder="Address"
                        aria-label="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="col">
                    <label htmlFor="name">Distance</label>
                      <input
                        type="number"
                        className="form-control ct-fc"
                        placeholder="Distance"
                        aria-label="Distance"
                        required
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col">
                    <label htmlFor="name">Price</label>
                      <input
                        type="number"
                        className="form-control ct-fc"
                        placeholder="Price"
                        aria-label="Price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="col">
                    <label htmlFor="name">MaxGroupSize</label>
                      <input
                        type="number"
                        className="form-control ct-fc"
                        placeholder="MaxGroupSize"
                        aria-label="MaxGroupSize"
                        required
                        value={maxGroupSize}
                        onChange={(e) => setMaxGroupSize(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col">
                    <label htmlFor="name">Photo URL</label>
                      <input
                        type="text"
                        className="form-control ct-fc"
                        placeholder="Photo URL"
                        aria-label="Photo URL"
                        required
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                      />
                    </div>
                    <div className="col">
                    <label htmlFor="name">IsTourAvailable</label>
                      <input
                        type="boolean"
                        className="form-control ct-fc"
                        placeholder="IsTourAvailable"
                        aria-label="IsTourAvailable"
                        required
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col">
                    <label htmlFor="name">Tour Description</label>
                      <textarea
                        className="form-control ct-fc"
                        placeholder="Tour Description"
                        aria-label="Tour Description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="row g-3 mx-3 my-4 d-flex justify-content-center">
                    <button type="button" className="btn sub-btn" onClick={handleClick}>Submit</button></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     </section>
    </>
  )
}

export default EditTour