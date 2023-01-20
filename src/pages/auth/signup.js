// import { useRef } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../..';

// const SignUp = () => {
//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);

//     const authSign = u => {
//         u.preventDefault();
//         createUserWithEmailAndPassword( auth,
//             emailRef.current.value, passwordRef.current.value)
//             .then(user => {console.log(user)})
//             .catch(err => {console.log(err)})
//     }

//     return (
//         <form action="">
//             <h1>Sign up</h1>
//             <input ref={emailRef} type="email"/>
//             <input ref={passwordRef} type="password"/>
//             <button onClick={authSign}>Sign up</button>
//         </form>
//     );
// }


// export default SignUp;

//NEW CODE--------------------------------------------------------------------------------------------
import {Form, Button, Card, Alert } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./userAuthContext";


export default function Signup(){
    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const passwordConfirmRef = useRef();
    // const { signup, currentUser } = useAuth();
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);

    // async function handleSubmit(e){
    //     e.preventDefault()
    //     if(passwordRef.current.value != 
    //         passwordConfirmRef.current.value){
    //             return setError("Passwords do not match")
    //         }

    //     try{
    //         setError("")
    //         setLoading(true)
    //       await  signup(emailRef.current.value, passwordRef.current.value)
    //     }catch{
    //         setError("Failed to create an account")
    //     }
    //     setLoading(false)
    // }

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };

    return(

        <Container className="d-flex align-items-center"
       justify-content-center style={{minHeight: "100vh"}}
       > 
        <div className="w-100" style={{maxWidth:'400px'}}>
         <>
        <Card>
           <Card.Body>
            <h2 className="text-center mb-4">
                Sign Up
            </h2>
           {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="Email address" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                     />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </Form.Group>
                {/* <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password"
                    placeholder="Enter password"  
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group> */}
                <div className="d-grid gap-2">
                <Button style={{marginTop: 10}} className="w-100" type="submit">Sign Up</Button>
                </div>
       
            </Form>
            </Card.Body> 
        </Card>
        <div class="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
        </div>
        </>
       </div>
    
        </Container>
    )
}