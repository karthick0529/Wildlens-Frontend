import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../shared/tourCard.css";
import "../styles/mybooking.css";
import { userServices } from "../Instance/userServices";
import moment from "moment";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";
import backgroundImage from "..//assets/images/booking.jpg"; // Import the background image

const MyBooking = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await userServices.getMyBookings();
        setBookings(res.data.userBookings || []); // Ensure bookings is always an array
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center pt-5 mt-5">
        <RiseLoader color="#135D66" />
      </div>
    );
  }

  if (error) {
    return <h4 className="text-center pt-5 mt-5">{error}</h4>;
  }

  if (!loading && bookings.length === 0) {
    return <h1 className="text-center pt-5 mt-5">Your Booking is Empty</h1>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center my-4">Your Booking</h1>
      <Row>
        {bookings.map((booking, index) => {
          const bookingDate = booking.bookAt
            ? moment(booking.bookAt).format("D MMM YYYY")
            : "Date not available";

          return (
            <Col lg={4} sm={12} md={6} key={index} className="my-4">
              <div className="tour__card">
                <Card style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <Card.Body className="cardBody">
                    <div className="text-left mt-3 b-card">
                      <span className="card-title">Tour Name: </span>
                      {booking.tourId?.name || "N/A"}
                    </div>
                    <div className="text-left mt-3 b-card">
                      <span className="card-title">Name: </span>
                      {booking.fullName || "N/A"}
                    </div>
                    <div className="text-left mt-3 b-card">
                      <span className="card-title">Email: </span>
                      {booking.userEmail || "N/A"}
                    </div>
                    <div className="text-left mt-3 b-card">
                      <span className="card-title">Guest Size: </span>
                      {booking.guestSize || "N/A"}
                    </div>
                    <div className="text-left mt-3 b-card">
                      <span className="card-title">Booking Date: </span>
                      {bookingDate}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MyBooking;
