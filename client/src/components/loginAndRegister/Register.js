import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import "./login.css"

export default function Register(props) {
    const [ user, setUser ] = useState([])
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [error ,setError] = useState("")
    const history = useHistory();
    

    const handleSubmit = (e)=>{
        e.preventDefault()
  
        fetch("/api/v2/users/register", {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify({
                name:name,
                email:email,
                password:password
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                // alert(data.error)
                setError(data.error)
            }else{
                
                history.push('/');

            }
            // if ===================
        })
        .catch()
        
        
    }

    return ( 
        <div className="grandParentContaniner"> 
            <Form className="parentContainer" onSubmit={handleSubmit}>
                <div className="top"><p>Register</p></div>
                <hr />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" value={name} onChange={(e)=> {setName(e.target.value)}}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                </Form.Group>
                {error ? (<Message
                        error
                        header='Invalid Account'
                        content='Invalid Email'
                    />) : ("")}
                
                <Button variant="primary" type="submit">
                    Register
                </Button>
                
            </Form>
        </div>
    )
}
