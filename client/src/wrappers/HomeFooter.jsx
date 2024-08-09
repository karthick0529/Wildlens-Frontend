import React from 'react'
import "./homefooter.css"
import { Container, Row ,Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import logoImg from "../assets/images/logo.png";
import { Link, Outlet } from 'react-router-dom';
import { RiYoutubeLine,RiFacebookCircleLine ,RiGithubFill,RiInstagramLine   } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineMailOutline,MdPhone  } from "react-icons/md";

  const quick_links = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "#about",
      display: "About",
    },
    {
      path: "/tours",
      display: "Tours",
    },
  ];

  const quick_links2 = [
    {
      path: "/gallery",
      display: "Gallery",
    },
    {
      path: "/login",
      display: "Login",
    },
    {
      path: "/register",
      display: "Register",
    },
  ];


const HomeFooter = () => {

  const year = new Date().getFullYear()

  return (
    <>
    <Outlet/>
   <footer className="footer" id='about'>
    <Container>
      <Row>
        <Col lg={3}>
          <div className="logo mt-2">
            <img src={logoImg} alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, commodi.</p>
            <div className="social__links d-flex align-items-center gap-4 mt-4">
                <span>
                  <Link to ="#"><RiYoutubeLine /></Link>
                </span>
                <span>
                  <Link to ="#"><RiFacebookCircleLine /></Link>
                </span>
                <span>
                  <Link to ="https://github.com/karthick0529"><RiGithubFill  /></Link>
                </span>
                <span>
                  <Link to ="#"><RiInstagramLine  /></Link>
                </span>
            </div>
          </div>
        </Col>
        <Col lg={3}>
        <h5 className="footer__link-title">Discover</h5>
        <ListGroup className="footer__quick-links">
        {
          quick_links.map((item,index) => (
            <ListGroupItem key={index} className="ps-0 border-0">
              <Link to = {item.path}>{item.display}</Link>
            </ListGroupItem>
          )) 
        }
        </ListGroup>
        </Col>
        <Col lg={3}>
        <h5 className="footer__link-title">Quick Links</h5>
        <ListGroup className="footer__quick-links">
        {
          quick_links2.map((item,index) => (
            <ListGroupItem key={index} className='ps-0 border-0'>
              <Link to = {item.path}>{item.display}</Link>
            </ListGroupItem>
          )) 
        }
        </ListGroup>
        </Col>
        <Col lg={3}>
        <h5 className="footer__link-title">Contact</h5>
        <ListGroup className="footer__quick-links">
        
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3 '>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><FiMapPin /></span>
                  Address :
                </h6>
                <p className='mb-0 '>India</p>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3 '>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><MdOutlineMailOutline /></span>
                  Email :
                </h6>
                <p className='mb-0 '>karthi@gmail.com</p>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3 '>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><MdPhone  /></span>
                  Phone :
                </h6>
                <p className='mb-0 '>9876543210</p>
            </ListGroupItem>
        </ListGroup>
        </Col>
            <Col lg={12} className='text-center'>
                <p className="copyright">Copyright {year}, design and develop by Karthick. All rights reserved.</p>
            </Col>
      </Row>
    </Container>
   </footer>
   </>
  )
}

export default HomeFooter