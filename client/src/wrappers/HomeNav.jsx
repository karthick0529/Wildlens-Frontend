import { useContext, useEffect, useRef } from "react";
import {  Row } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { IoMenuSharp } from "react-icons/io5";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import "./homeNav.css";
import { userServices } from "../Instance/userServices";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HashLink as Link  } from "react-router-hash-link";

const nav_links = [
  {
    path: "/",
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

const HomeNav = () => {
  
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext)

  const logout =(e) => {
   
    dispatch({type:'LOGOUT'})
    
    userServices.logout().then(res => {
      toast.success(res.data.message);

      navigate("/home")
     
  })
  .catch(err => {
    toast.error(err.message)
  })

}
 
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });
  const userName =user && user.userName.toUpperCase();
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between ">
              <div className="logo">
                <img src={logoImg} alt="" />
              </div>

              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu d-flex align-items-center gap-5">
                  {nav_links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <Link 
                        to={item.path}  >
                        {item.display}
                      </Link>
                     
                    </li>
                    
                  ))}
                   {user && user.role=="user"? (<li className="nav__item">
                      <Link 
                        to="/myBookings" >
                       My Booking
                      </Link>
                     
                    </li>):user && user.role=="admin"? ( <Dropdown as={ButtonGroup}>
      <Button  size="sm"
             id="nav-dropdown">Dashboard</Button>

      <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

      <Dropdown.Menu >
        <Dropdown.Item href="/admin/createTour">Create Tour</Dropdown.Item>
        <Dropdown.Item href="/admin/tourLists">Edit Tour</Dropdown.Item>
        <Dropdown.Item href="/admin/bookings">Bookings</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>):('')}
                </ul>
              </div>
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user? (
                  
                    <>
                    
                      <h5 className="mb-0">{userName}</h5>
                      <Button className="btn primary__btn" onClick={logout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
                <span className="mobile__menu" onClick={toggleMenu}>
                  <IoMenuSharp />
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>
      <Outlet />
    </>
  );
};

export default HomeNav;
