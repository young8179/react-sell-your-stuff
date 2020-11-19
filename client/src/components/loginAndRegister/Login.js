import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import "./login.css"
import { LoginContext } from './LoginContextProvider';


export default function Login(props) {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const [loginStatus, setLoginStatus] = useState(false)
    const loginContext = useContext(LoginContext)
    const [error, setError] = useState("")
    // const UserContext = createContext({
    //     user:user
    // })


    // console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/api/v2/users/login", {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify({

                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())

            .then(data => {
                if (data.error) {
                    // alert(data.error)
                    setError(data.error)
                    history.push("/")
                } else {
                    loginContext.setUser(data)
                    history.push("/main")
                    console.log(data)

                }

            })
            .catch()

    }
    // useEffect(()=>{
    //     fetch("http://localhost:3000/api/v2/users/login")
    //         .then(res=> res.json())
    //         .then((data) => {

    //             // props.history("/")
    //             // console.log(user)
    //         })
    // }, [])

    return (
        <div className="grandParentContaniner">
            <Form className="parentContainer" onSubmit={handleSubmit}>
                <div className="top"><p>Login</p></div>
                <hr />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {error ? (<Message
                        error
                        header='Invalid Account'
                        content='Wrong email or password'
                    />) : ("")}
                </Form.Group>
                <Form.Group className="btn-group">


                    <Button variant="primary" type="submit" className="login-btn">
                        Login
                    </Button>
                    <Button className="register-btn-b login-btn" variant="primary" type="text">
                        <NavLink className="register-btn" to="/register">Register</NavLink>
                    </Button>

                </Form.Group>

                {/* <Button.Group>
                        <Button variant="primary" type="submit" className="login-btn">
                            Login
                        </Button>
                            <Button.Or />
                        <Button className="register-btn-b login-btn" variant="primary" type="text">
                            <NavLink className="register-btn" to="/register">Register</NavLink>
                        </Button>
                    </Button.Group> */}

            </Form>
        </div>
    )
}

