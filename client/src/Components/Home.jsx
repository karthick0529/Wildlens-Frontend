
import firstImg from "../assets/images/first.jpg";
import secondImg from "../assets/images/secondImg.jpg";
import thirdImg from "../assets/images/ThirdImg.jpg";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import '../styles/home.css';
import Subtitle from '../shared/subtitle';
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../wrappers/Featured tours/FeaturedTourList";
import MasonryImagesGallery from "../wrappers/image-gallery/MasonryImagesGallery";
import Newsletter from "../shared/Newsletter";
import HomeFooter from '../wrappers/HomeFooter';

const Home = () => {
  return (
    <>
    <section>
      <Container lg={12} >
        <Row >
          <Col lg={6} >
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-item-center">
                <Subtitle subtitle ={'Know Before You Go'}/>
                <img src={worldImg} alt="" />
              </div>
              <h1>
                <span className = "highlight">Travel</span> where nature's beauty and resilience shine
                brightly.
              </h1>
              <p>
                Embarking on a wildlife tour immerses you in the raw
                beauty of nature. Guided by experts, witness rare species in
                their habitats, from majestic lions on African plains to vibrant
                marine life in coral reefs. These tours foster conservation
                awareness while providing unforgettable encounters with the
                world's most extraordinary creatures.
              </p>
            </div>
          </Col>
          <Col lg={2}>
          <div className="hero__img-box ">
            <img src={firstImg} alt="" />
            </div>
            </Col>
            <Col lg={2}>
          <div className="hero__img-box mt-4">
            <img src={secondImg} alt="" />
            </div>
            </Col>
            <Col lg={2}>
          <div className="hero__img-box mt-5">
            <img src={thirdImg} alt="" />
            </div>
            </Col>
            <SearchBar/>
        </Row>
      </Container>
      </section>
      <section>
      <Container>
      <Row>
      <Col lg ={3}>
    <h5 className="services__subtitle">What we serve</h5>
    <h2 className="services__title">We offer our best services</h2>
      </Col>
      <ServiceList/>
      </Row>
      </Container>
      </section>
      <section>
      <Container>
      <Row>
      <Col lg = {12} className='mb-5'>
      <Subtitle subtitle = {'Explore'}/>
      <h2 className="featured__tour-title">Our featured tours</h2>
      </Col>
      <FeaturedTourList/>
      </Row>
      </Container>
      </section>
      <section>
      <Container>
      <Row>
      <Col lg ={6}>
      <div className="experience__content">
        <Subtitle subtitle={"Experience"}/>
        <h2>with our all Experience <br /> we will serve you</h2>
        <p> Discover exceptional travel experiences with personalized itineraries, expert local guides, and smooth logistics, crafted to make every moment immersive, stress-free, and uniquely memorable for you</p>
      </div>
      
      <div className="counter__wrapper d-flex align-item-center gap-5">
        <div className="counter__box">
          <span>10k+</span>
          <h6>Successful Trip</h6>
        </div>
        <div className="counter__box">
          <span>3k+</span>
          <h6>Regular Clints</h6>
        </div>
        <div className="counter__box">
          <span>5</span>
          <h6>Years of experience</h6>
        </div>
      </div>
      </Col>
      <Col lg ={6}>
      <div className="experience__img">
        <img src={experienceImg} alt="" />
        </div>
        </Col>
      </Row>
      </Container>
      </section>

      <section>
      <Container>
      <Row>
      <Col lg ={12}>
      <Subtitle subtitle={"Gallery"}/>
      <h2 className="gallery__title">Visit our customers tour gallery</h2>
      </Col>
      <Col lg ={12}>
      <MasonryImagesGallery/>
      </Col>
      </Row>
      </Container>
      </section>
     <Newsletter/>
     <HomeFooter/>
    </>
  );
};

export default Home;
