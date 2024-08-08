import TourCard from "../../shared/TourCard";
import { Col } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { REACT_APP_API_URL } from "../../utils/config";
import { RiseLoader } from "react-spinners";

const FeaturedTourList = () => {

  const {tour : featuredTours ,loading , error} = useFetch(`${REACT_APP_API_URL}/tours/search/getAvailableTour`);

  return (
    <>{
      loading && <div className="text-center pt-5 mt-5"><RiseLoader color="#135D66" /></div>
    }
    {
      error && <h4>{error}</h4>
    }
      {!loading && !error && featuredTours?.map(tour => (
        <Col lg={3} md={6} sm={6} className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
