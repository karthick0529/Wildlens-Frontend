import React, { useState,useEffect } from 'react'
import { Card, CardBody, Container ,Row,Col} from 'react-bootstrap'
import '../shared/tourCard.css'
import '../styles/mybooking.css'
import { userServices } from '../Instance/userServices';
import moment from 'moment';
import { toast } from 'react-toastify';
import { RiseLoader } from 'react-spinners';

const MyBooking = () => {

    const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(()=>{
    const bookings = async() => {
        setLoading(true)
        try {
            
            userServices.getMyBookings()
            .then((res) =>{
                setBookings(res.data.userBooking);
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
    {loading && <div className="text-center pt-5 mt-5"><RiseLoader color="#135D66" /></div>}
    {error && <h4 className="text-center pt-5 mt-5">{error}</h4>}
    {!loading && !error && bookings.length==0 && <h1 className="text-center pt-5 mt-5">Your Booking is Empty</h1> }
    {!loading && !error && bookings.length>0 && (
    <Container className='mt-5'>
        <h1 className='text-center my-4'>Your Booking</h1>
        <Row>
            {bookings.map((booking,index) =>(
                     <Col lg={4} sm={12} md={6} key={index} className='my-4'>
                     <div className="tour__card">
                 <Card>
             
                   <CardBody className="cardBody">
                    <div className="text-center mt-3 b-card">
                   <span >Tour Name : </span>{booking.tourName}
                    
                    
                     </div>
                     <div className="text-center mt-3 b-card" >
                      <span >Name : </span>{booking.fullName} 
                     </div>
                     
                     <div className="text-center mt-3 b-card">
                     <span>Email :  </span>{booking.userEmail}
                     </div>
                     <div className="text-center mt-3 b-card">
                     <span>Guest Size :  </span>{booking.guestSize}
                     </div>
                     <div className="text-center mt-3 b-card">
                       <span>Booking Date :  </span>{booking_date}
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
  )
}

export default MyBooking