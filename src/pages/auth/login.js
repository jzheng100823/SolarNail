import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { auth } from '../..';
import React, { useState } from 'react';
import {Form, Button, Card, Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { Container } from 'react-bootstrap'
import GoogleButton from "react-google-button";
import { useUserAuth } from "./userAuthContext";


const Login = ()=> {
    //  const navigation = useNavigate();

    // useEffect(() => {
    //     const auth = getAuth();
    //     console.log("auth: ", auth);
    //     if (auth.currentUser != null) {
    //         console.log("should navigate");
    //         navigation('/');
    //     }
    // });

    // const emailRef = useRef(null);
    // const passwordRef = useRef(null);


    // const loginClick = e => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    //         .then(user => navigation('/'))
    //         .catch(ex => console.log(ex))
    // }



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
          await googleSignIn();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };
    
    
    return (
        // <div>
        //     <input ref={emailRef} type="text" placeholder="User" />
        //     <input ref={passwordRef} type="password" />
        //     <button onClick={loginClick}>Login</button>
        //  </div>


        <div className="main">
          <Container className="d-flex align-items-center"
        justify-content-center style={{minHeight: "100vh"}}
        > 
         <div className="w-100" style={{maxWidth:'400px'}}>

        <>
        <Card>
           <Card.Body>
            <h2 className="text-center mb-4">
                Login
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} 
                    required />
                </Form.Group>
                <Button style={{marginTop: 10}} className="w-100" variant="primary" type="submit">Login</Button>
            </Form>
            <hr />
            <div>
            <GoogleButton
                className="w-100"
                type="dark"
                onClick={handleGoogleSignIn}
            />
            </div>
            </Card.Body> 
        </Card>
        <div class="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        </>
        </div>
        </Container>
        </div>
       
    );
}

export default Login;