import { Card, CardBody } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./tourCard.css";
import calculateAvgRating from "../utils/avgRating"; 


const TourCard = ({ tour }) => {
  const { _id, name, city, photo, price, isAvailable, reviews } = tour;

  const {totalRating,avgRating} = calculateAvgRating(reviews)

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="tour__img" />
          {isAvailable && <span>Featured</span>}
        </div>

        <CardBody className="cardBody">
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1 ">
              <FiMapPin className="icon" />
              {city}
            </span>
            <span className="rating d-flex align-items-center gap-1 ">
              <FaStar className="icon"  />
              {avgRating === 0? null : avgRating}
              {totalRating === 0 ? ("Not Rated" ) : (<span>({reviews.length})</span>
                )} 
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{name}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
            ₹{price} <span>/per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
