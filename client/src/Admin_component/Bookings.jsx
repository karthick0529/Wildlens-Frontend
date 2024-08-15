import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { adminServices } from "../Instance/adminServices";
import moment from "moment";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Bookings = () => {
  const thead = [
    { head: "SL NO" },
    { head: "Tour Name" },
    { head: "Booking Date" },
    { head: "Customer Name" },
    { head: "Guest Size" },
    { head: "Email" },
    { head: "Phone" },
    { head: "Companion(s)" },
  ];

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await adminServices.getBookings();
        console.log(res.data.bookings); // Debugging: Check the structure of the API response
        setBookings(res.data.bookings || []); // Assuming 'bookings' is the correct key
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Bookings</h1>
      {loading && (
        <div className="text-center pt-5 mt-5">
          <RiseLoader color="#135D66" />
        </div>
      )}
      {error && <h4 className="text-center">{error}</h4>}
      {!loading && !error && (
        <Container className="tab">
          <table className="table table-dark table-striped mt-3 text-center">
            <thead>
              <tr>
                {thead.map((item, index) => (
                  <th scope="col" key={index}>
                    {item.head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{booking.tourId?.name || "N/A"}</td> 
                  <td>{moment(booking.bookAt).format("D MMM YYYY")}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.phone}</td>
                  <td>
                    {Array.isArray(booking.companion) && booking.companion.length > 0
                      ? booking.companion.join(", ")
                      : "No Companion"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}
    </>
  );
};

export default Bookings;
