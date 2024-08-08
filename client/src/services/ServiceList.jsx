import React from 'react'
import ServiceCard from "./ServiceCard"
import { Col } from 'react-bootstrap'
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
    {
        imgUrl : weatherImg,
        title : "Calculate Weather",
        desc: "Enjoy our tour in any weather; we provide flexible plans and cover for unexpected conditions.",
    },{
        imgUrl : guideImg,
        title : "Best Tour Guides",
        desc: "Explore historic landmarks and hidden gems with our engaging guide, who brings each story to life.",
    },{
        imgUrl : customizationImg,
        title : "Customization",
        desc: "Tailor your tour to your interests with customized routes, activities, and schedules for a unique experience.",
    }
]

const ServiceList = () => {
  return <>
  {
    servicesData.map((item, index) => <Col lg={3} md={6} sm={12} className="mb-4" key={index}>
        <ServiceCard item = {item}/>
    </Col>)
  }
  </>
}

export default ServiceList