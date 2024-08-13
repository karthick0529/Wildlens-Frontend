import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HomeFooter from '../wrappers/HomeFooter';
import calculateAvgRating from "../utils/avgRating";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { RiMapPinUserFill, RiMapPin2Line, RiMoneyRupeeCircleFill, RiMapPinTimeLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import "../styles/tour-details.css";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../wrappers/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { REACT_APP_API_URL } from "../utils/config";
import { userServices } from "../Instance/userServices";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tour: tours } = useFetch(`${REACT_APP_API_URL}/tours/${id}`);

  const {
    photo,
    name,
    description,
    price,
    address,
    city,
    distance,
    maxGroupSize,
  } = tours;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await userServices.getReviews(id);
      setReviews(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please Login');
      return;
    }

    try {
      const response = await userServices.addReview(reviewText, rating, id);
      toast.success(response.data.message);
      setReviewText("");
      setRating(null);
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const response = await userServices.updateReview(reviewId, reviewText, rating);
      toast.success(response.data.message);
      fetchReviews(); // Refresh reviews after update
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await userServices.deleteReview(reviewId);
      toast.success(response.data.message);
      fetchReviews(); // Refresh reviews after deletion
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews on component mount
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <section>
        <Container>
          {loading && <div className="text-center pt-5 mt-5"><RiseLoader color="#135D66" /></div>}
          {error && <h4 className="text-center pt-4">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg={8}>
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{name}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="rating d-flex align-items-center gap-1 mt-2">
                        <FaStar />
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? "Not Rated" : <span>({reviews?.length})</span>}
                      </span>

                      <span className="mt-2">
                        <RiMapPinUserFill />
                        {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <RiMapPin2Line />
                        {city}
                      </span>
                      <span>
                        <RiMoneyRupeeCircleFill />₹{price}/per person
                      </span>
                      <span>
                        <RiMapPinTimeLine />
                        {distance}k/m
                      </span>
                      <span>
                        <GrGroup />
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{description}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandle}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} onClick={() => setRating(i + 1)}>
                            {i + 1} <FaStar />
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          placeholder="Share your thoughts"
                          required
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.userName}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}<FaStar className="i" />
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                            {user && review.userId === user._id && (
                              <div className="review__actions">
                                <Button variant="link" onClick={() => handleEditReview(review._id)}><FaEdit /></Button>
                                <Button variant="link" onClick={() => handleDeleteReview(review._id)}><FaTrash /></Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <Booking tour={tours} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
      <HomeFooter />
    </>
  );
};

export default TourDetails;
