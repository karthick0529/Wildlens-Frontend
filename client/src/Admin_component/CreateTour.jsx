import { useState } from "react";
import { adminServices } from "../Instance/adminServices";
import './createTour.css'
import { useNavigate } from "react-router-dom";
import DashBoard from "./Dashboard";
import { Container,Col,Row } from "react-bootstrap";
import { toast } from "react-toastify";


const CreateTour = () => {

  const navigate = useNavigate()

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
      .createTour(
        name,
        description,
        city,
        address,
        distance,
        photo,
        maxGroupSize,
        price,
        isAvailable
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
        navigate("/admin/tourLists")
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <>
   
    <section >
    <Container>
      <Row className="row g-3 mt-4">
       
          <Col lg={12} md={8} sm={12}>
          
            <div className="card ct-card">
              <h1 className="card-header d-flex justify-content-center py-5">
                Create Tour
              </h1>
              <div className="card-body ct-card-body">
                <form onSubmit={handleClick}>
                  <div className="row g-3 mx-3 my-4">
                    <div className="col ">
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
          
          </Col>
        </Row>
      </Container>
     </section>
    </>
  );
};

export default CreateTour;
