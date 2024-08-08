import React from "react";
import "./newsletter.css";
import maleTourist from "../assets/images/male-tourist.png";
import { Container, Row, Col } from "react-bootstrap";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                Subscribe now to gain access to a wealth of travel information,
                including insider tips, detailed destination guides, and
                exclusive offers. Our curated content helps you plan your trips
                more effectively, stay updated on the latest travel trends, and
                discover hidden gems, ensuring every journey is memorable and
                hassle-free.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
