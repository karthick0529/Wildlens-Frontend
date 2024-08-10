import { Button, Form, FormGroup, ListGroup } from "react-bootstrap";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookingSchema } from "../../formikSchema/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { userServices } from "../../Instance/userServices";
import Stripe from "stripe";

const Booking = ({ tour, avgRating }) => {
  const { id } = useParams();
  const { price, reviews } = tour;
  const {user} = useContext(AuthContext)

  const onSubmit = async () => {
    if(!user || user===null || user===undefined){
      toast.error('Please Login')
    }else{
    try {

      userServices.createBooking(values,id)
      .then(res=>{
       const sessionId = res.data
        toast.success("Redirecting to Checkout page"),
        Stripe.redirectToCheckout({ sessionId: sessionId.id })
                // window.location.href = res.data.session.url;
      })
      .catch(err => {
        toast.error(err)
        console.log(err)
      })
    } catch (error) {
      toast.error(error.message);
    }
  }}

  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        phone: "",
        bookAt: "",
        guestSize:1,
        companion:false,
      },
      validationSchema: bookingSchema,
      onSubmit,
    });
    let companionFee=0;
    if(values.companion==true) {
      companionFee = 6000;
    }
    
    const serviceFee = 240;
    const totalAmount = Number(price) * Number(values.guestSize) + Number(serviceFee) + Number(companionFee);
    
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
        ₹{price} <span>/per Person</span>
        </h3>
        <span className="rating d-flex align-items-center  ">
          <span>
            <FaStar />
          </span>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.fullName && touched.fullName ? "input-error" : ""
              }
            />
            {errors.fullName && touched.fullName && <p className='error-msg'>{errors.fullName}</p>}
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone && touched.phone ? "input-error" : ""}
            />
            {errors.phone && touched.phone && <p className='error-msg'>{errors.phone}</p>}

          </FormGroup>
          <FormGroup >
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              value={values.bookAt}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.bookAt && touched.bookAt ? "input-error" : ""}
            />
            {errors.bookAt && touched.bookAt && <p className='error-msg'>{errors.bookAt}</p>}
            </FormGroup>
            <FormGroup >
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              value={values.guestSize}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.guestSize && touched.guestSize ? "input-error" : ""
              } />
            {errors.guestSize && touched.guestSize && <p className='error-msg'>{errors.guestSize}</p>}

          </FormGroup>
          <FormGroup >
          
            <input
              type="checkbox"
              id="companion"  
              onChange={handleChange}
              className="checkbox my-3"
              value={values.companion}
            />
            
            <label  htmlFor="companion">Do You Want Companion</label>
            
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <li className="border-0 px-0 li">
            <h5 className="d-flex align-items-center gap-1">
            ₹{price} <RiCloseLine /> 1 person
            </h5>
            <span>₹{price}</span>
          </li>

        {values.companion == true? <li className="border-0 px-0 li">
        <h5>Companion Charge</h5>
        <span>₹{companionFee}</span>
      </li> : "" }

          <li className="border-0 px-0 li">
            <h5>Service Charge</h5>
            <span>₹{serviceFee}</span>
          </li>

          <li className="border-0 px-0 total li">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </li>

        
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
