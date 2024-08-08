import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import HomeFooter from '../wrappers/HomeFooter'
import { Container, Row, Col } from "react-bootstrap";
import useFetch from '../hooks/useFetch'
import { REACT_APP_API_URL } from "../utils/config";
import { RiseLoader } from "react-spinners";

const Tours = () => {

  const [pageCount , setPageCount] = useState(0)
  const [page,setPage]= useState(0);
  const {tour : tours,loading,error} = useFetch(`${REACT_APP_API_URL}/tours?page=${page}`)
  const {tour:tourCount} = useFetch(`${REACT_APP_API_URL}/tours/search/getTourCount`)
 
  useEffect(()=>{
    const pages = Math.ceil(tourCount / 8)
    setPageCount(pages)
    window.scrollTo(0,0);

  },[page,tourCount,tours])

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section >
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {
            loading && <div className="text-center pt-5 mt-5"><RiseLoader color="#135D66" /></div>
          }
          {
            error && <h4 className="text-center">{error}</h4>
          }
          {
            !loading && !error && <Row>
            {tours?.map((tour) => (
              <Col lg={3} md={6} sm={6} className = "mb-4" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg={12}>
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3 ">
              {[...Array(pageCount).keys()].map(number=> (
                <span key={number} onClick={()=> setPage(number)}
                className ={page===number ? 'active__page' : ""}>
                  {number +1}
                </span>
              ))}
            </div>
            </Col>
          </Row>
          }
        </Container>
      </section>
      <Newsletter/>
      <HomeFooter/>
    </>
  );
};

export default Tours;
