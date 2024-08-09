import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col } from "react-bootstrap";
import "../shared/tourCard.css";
import "../styles/mybooking.css";
import { userServices } from "../Instance/userServices";
import moment from "moment";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";
import bookingImage from "../assets/images/booking.jpg"; // Import the image

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        userServices
          .getMyBookings()
          .then((res) => {
            setBookings(res.data.userBooking);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.message);
            setLoading(false);
          });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatBookingDate = (date) => moment(date).format("D MMM YYYY");

  return (
    <>
      {loading && (
        <div className="text-center pt-5 mt-5">
          <RiseLoader color="#135D66" />
        </div>
      )}
      {error && <h4 className="text-center pt-5 mt-5">{error}</h4>}
      {!loading && !error && bookings.length === 0 && (
        <h1 className="text-center pt-5 mt-5">Your Booking is Empty</h1>
      )}
      {!loading && !error && bookings.length > 0 && (
        <Container className="mt-5">
          <h1 className="text-center my-4">Your Booking</h1>
          <Row>
            {bookings.map((booking, index) => (
              <Col lg={4} sm={12} md={6} key={index} className="my-4">
                <div
                  className="tour__card"
                  style={{
                    backgroundImage: `url(${bookingImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <Card className="bg-transparent border-0">
                    <CardBody className="cardBody text-start">
                      <div className="mt-3 b-card">
                        <span className="fw-bold">Tour Name: </span>
                        {booking.tourName}
                      </div>
                      <div className="mt-3 b-card">
                        <span className="fw-bold">Name: </span>
                        {booking.fullName}
                      </div>
                      <div className="mt-3 b-card">
                        <span className="fw-bold">Email: </span>
                        {booking.userEmail}
                      </div>
                      <div className="mt-3 b-card">
                        <span className="fw-bold">Guest Size: </span>
                        {booking.guestSize}
                      </div>
                      <div className="mt-3 b-card">
                        <span className="fw-bold">Booking Date: </span>
                        {formatBookingDate(booking.bookAt)}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default MyBooking;
