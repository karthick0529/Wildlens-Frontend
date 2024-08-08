import React, { useContext } from 'react'
import '../styles/login.css'
import { Container, Row, Col, Form,FormGroup ,Button} from "react-bootstrap";
import registerImg from "../assets/images/register.jpg";
import userIcon from "../assets/images/user.png";
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import HomeFooter from '../wrappers/HomeFooter'
import { registerSchema } from '../formikSchema/schema';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { userServices } from '../Instance/userServices';



const Register = () => {

    const navigate = useNavigate()
    
   const {dispatch} = useContext(AuthContext)

   const onSubmit = async (values,actions)=>{
    
    try {

        userServices.register(values)
        .then(res => {
          dispatch({type:"REGISTER_SUCCESS"})
          toast.success('Registered Successfully')
                  actions.resetForm()
                navigate("/login")
                
        }).catch(err =>{
          toast.error(err.response.data.message)
          
        })
       } catch (error) {
          toast.error(error.message)
        }
}
  const { values,handleBlur,handleChange,touched,errors,handleSubmit} = useFormik({
    initialValues:{
      userName:'',
      email:'',
      password:''
    },
    validationSchema:registerSchema,
    onSubmit
  })

  return (
    <>
     <section>
      <Container >
        <Row >
          <Col lg={8} className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleSubmit}>
              <FormGroup>
                      <input type="text" placeholder="Username" required id="userName" 
                    value={ values.userName} 
                    onChange={ handleChange}
                    onBlur={ handleBlur}
                    className={errors.userName && touched.userName ? 'input-error':""}
                      />
                      {errors.userName && touched.userName && <p className='error'>{errors.userName}</p>}
                      
                </FormGroup>
                <FormGroup>
                      <input type="email" placeholder="Email" required id="email" 
                      value={ values.email} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.email && touched.email ? 'input-error':""}
                      />
                      {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                </FormGroup>
                <FormGroup>
                      <input type="password" placeholder="Password" required id="password" 
                      value={ values.password} 
                      onChange={ handleChange}
                      onBlur={ handleBlur}
                      className={errors.password  && touched.password ? 'input-error':""}
                      />
                      {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                </FormGroup>
                <Button className = "btn  auth__btn " type="submit">Register</Button>
              </Form>
              <p>Already have an account? <Link to= "/login">Login</Link></p>
            </div>
          </div>
          </Col>
       </Row>
       </Container>
      </section>
      <HomeFooter/>
    </>
  )
}

export default Register