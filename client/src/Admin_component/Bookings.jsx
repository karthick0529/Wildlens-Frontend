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
    { head: "Companion" },
  ];
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(()=>{
    const bookings = async() => {
        setLoading(true)
        try {
            
            adminServices.getBookings()
            .then((res) =>{
                setBookings(res.data.booking);
                setLoading(false)
                
            }).catch((err)=>{
                toast.error(err.message)
            })

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
 bookings();
  },[]);

 
  const booking_date = moment(bookings.bookAt).format('D MMM YYYY')

  return (
    <>
      <h1 className="text-center mt-4">Bookings</h1>
      {loading && <div className="text-center pt-5 mt-5"><RiseLoader color="#135D66" /></div>}
        {error && <h4 className="text-center">{error}</h4>}
        {!loading && !error && (
      <Container className="tab ">
     
        <table className="table table-dark table-striped mt-3 text-center">
          <thead>
            <tr>
                {thead.map((item,index)=>(
                    <th scope="col" key={index}>{item.head}</th>
                ))}
            </tr>
          </thead>
          <tbody>
          {bookings.map((booking,index)=>(
            <tr key={index}>
              <td scope="row">{index+1}</td>
              <td>{booking.tourName}</td>
              <td>{booking_date}</td>
              <td>{booking.fullName}</td>
              <td>{booking.guestSize}</td>
              <td>{booking.userEmail}</td>
              <td>{booking.phone}</td>
              <td>Karthick</td>
              </tr>
                
              ))}
               </tbody>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
           
        </table>
      
      </Container>
        )}
    </>
  );
};

export default Bookings;
