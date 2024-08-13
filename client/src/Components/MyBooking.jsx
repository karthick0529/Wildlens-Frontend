import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col } from "react-bootstrap";
import "../shared/tourCard.css";
import "../styles/mybooking.css";
import { userServices } from "../Instance/userServices";
import moment from "moment";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";
import bookingImage from "../assets/images/booking.jpg";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await userServices.getMyBookings();
        setBookings(res.data.userBookings);
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatBookingDate = (date) => moment(date).format("D MMM YYYY");

  return (
    <>
      {loading && (
        <div className="loading-container">
          <RiseLoader color="#36d7b7" />
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="empty-container">
          <img src={bookingImage} alt="Booking" />
          <p>Your booking list is empty.</p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <Container>
          <Row>
            {bookings.map((booking) => (
              <Col md={4} key={booking._id}>
                <Card className="booking-card">
                  <Card.Img variant="top" src={booking.tourImage} />
                  <CardBody>
                    <Card.Title>{booking.tourName}</Card.Title>
                    <Card.Text>
                      <strong>Booking Date:</strong>{" "}
                      {formatBookingDate(booking.bookAt)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Guests:</strong> {booking.guestSize}
                    </Card.Text>
                    <Card.Text>
                      <strong>Total Price:</strong> {booking.totalPrice}
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default MyBooking;