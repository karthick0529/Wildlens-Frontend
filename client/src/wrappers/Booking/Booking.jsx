import { Button, Form, FormGroup, ListGroup } from "react-bootstrap";
import "./booking.css";
import { FaStar } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { bookingSchema } from "../../formikSchema/schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { userServices } from "../../Instance/userServices";

const Booking = ({ tour, avgRating }) => {
  const { id } = useParams();
  const { price, reviews } = tour;
  const { user } = useContext(AuthContext);

  const onSubmit = async (values) => {
    if (!user) {
      toast.error("Please Login");
      return;
    }

    try {
      // Create Razorpay order and initiate payment
      const { data } = await userServices.createBooking({
        tourId: id,
        amount: totalAmount,
        currency: "INR",
      });

      if (window.Razorpay) {
        const paymentOptions = {
          key: data.key_id,
          amount: data.amount,
          currency: data.currency,
          name: "Tour Booking",
          description: `Payment for booking ${id}`,
          order_id: data.id,
          handler: async (response) => {
            try {
              const verifyRes = await userServices.verifyPayment(response);
              if (verifyRes.data.message === "Payment verified successfully") {
                // Payment successful, now create the booking
                const bookingDetails = {
                  userId: user._id,
                  userEmail: user.email,
                  tourId: id,
                  tourName: tour.name,
                  fullName: values.fullName,
                  guestSize: values.guestSize,
                  phone: values.phone,
                  bookAt: values.bookAt,
                  totalPrice: totalAmount,
                  companion: values.companion,
                };

                await userServices.createUserBooking(bookingDetails);
                toast.success("Payment successful and booking confirmed!");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (error) {
              toast.error("Payment verification failed.");
              console.error(error);
            }
          },
          prefill: {
            name: values.fullName,
            email: user.email,
            contact: values.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(paymentOptions);
        paymentObject.open();
      } else {
        toast.error("Razorpay SDK failed to load.");
      }
    } catch (error) {
      toast.error("Booking creation failed.");
      console.error(error);
    }
  };

  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        phone: "",
        bookAt: "",
        guestSize: 1,
        companion: false,
      },
      validationSchema: bookingSchema,
      onSubmit,
    });

  let companionFee = 0;
  if (values.companion) {
    companionFee = 6000;
  }

  const serviceFee = 240;
  const totalAmount =
    Number(price) * Number(values.guestSize) +
    Number(serviceFee) +
    Number(companionFee);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per Person</span>
        </h3>
        <span className="rating d-flex align-items-center">
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
              className={errors.fullName && touched.fullName ? "input-error" : ""}
            />
            {errors.fullName && touched.fullName && (
              <p className="error-msg">{errors.fullName}</p>
            )}
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
            {errors.phone && touched.phone && (
              <p className="error-msg">{errors.phone}</p>
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="date"
              id="bookAt"
              required
              value={values.bookAt}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.bookAt && touched.bookAt ? "input-error" : ""}
            />
            {errors.bookAt && touched.bookAt && (
              <p className="error-msg">{errors.bookAt}</p>
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              value={values.guestSize}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.guestSize && touched.guestSize ? "input-error" : ""}
            />
            {errors.guestSize && touched.guestSize && (
              <p className="error-msg">{errors.guestSize}</p>
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="checkbox"
              id="companion"
              onChange={handleChange}
              className="checkbox my-3"
              value={values.companion}
            />
            <label htmlFor="companion">Do You Want Companion</label>
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

          {values.companion ? (
            <li className="border-0 px-0 li">
              <h5>Companion Charge</h5>
              <span>₹{companionFee}</span>
            </li>
          ) : (
            ""
          )}

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
