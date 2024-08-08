import { Container,Row,Col, Button } from 'react-bootstrap'
import '../styles/thankyou.css'
import { RiCheckboxCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


const ThankYou = () => {
  return (
    <>
    <section>
        <Container>
            <Row>
                <Col lg={12} className="pt-5 text-center">
                    <div className="thank__you">
                        <span><RiCheckboxCircleLine /></span>
                        <h1 className="mb-3 fw-semibold">Thank You</h1>
                        <h3 className="mb-4">Your tour is booked Successfully.</h3>

                        <Button className="btn primary__btn w-25"><Link to = "/home">Back to Home</Link></Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
   
    </>
  )
}

export default ThankYou