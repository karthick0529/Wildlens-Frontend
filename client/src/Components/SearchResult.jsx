import React, { useState } from "react";
import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "react-bootstrap";
import TourCard from "../shared/TourCard";
import { useLocation } from "react-router-dom";
import Newsletter from "../shared/Newsletter";
import HomeFooter from '../wrappers/HomeFooter'

const SearchResult = () => {

  const location = useLocation();
  const [tours] = useState(location.state);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {tours.length === 0 ? (
              <h4 className="text-center">No tour found</h4>
            ) : (
              tours?.map((tour) => (
                <Col lg={3} className="mb-4" key = {tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter/>
      <HomeFooter/>
    </>
  );
};

export default SearchResult;
