import { useRef } from "react";
import "./searchBar.css";
import { Col, Form, FormGroup } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { RiMapPinTimeLine, RiSearchLine,RiMoneyRupeeCircleLine  } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { REACT_APP_API_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const priceRef = useRef(0);
  const navigate = useNavigate();

  const searchHandle = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const price = priceRef.current.value;

    if (location === "" || distance === "" || price === "") {
      return toast.warn("All fields are required!");
    }

    const res = await fetch(
      `${REACT_APP_API_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&price=${price}`
    );

    if (!res.ok) toast.error("Something went wrong");

    const result = await res.json();
    
    navigate(
      `/tours/search?city=${location}&distance=${distance}&price=${price}`, {state:result.data}
    );
  };

  return (
    <Col lg={12}>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <FiMapPin />
            </span>
            <div>
              <h5 className="mt-1">Location</h5>
              <input type="text" placeholder="Where to?" ref={locationRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <RiMapPinTimeLine />
            </span>
            <div>
              <h5 className="mt-1">Distance</h5>
              <input
                type="number"
                placeholder="Distance km?"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <RiMoneyRupeeCircleLine  />
            </span>
            <div>
              <h5 className="mt-1">Price</h5>
              <input type="number" placeholder="0" ref={priceRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandle}>
            <RiSearchLine />
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
