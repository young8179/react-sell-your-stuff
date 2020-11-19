import React, { useState, useEffect, useContext } from 'react'
import { Button, Image, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import footerImg from "../img/2-2.png"
import { LoginContext } from '../loginAndRegister/LoginContextProvider';
import "./BaseLayout.css"

// export const UserContext = React.createContext()
export default function BaseLayout(props) {
    const {user, setUser} = useContext(LoginContext)
    const history = useHistory();
    const logout = ()=>{
        
        fetch("/api/v2/users/logout")
        
        .then(res=>res.json())
        .then(data=>{
            setUser(null)
            history.push("/")
        })
    } 
    useEffect(()=>{
        console.log("get user")
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                setUser(data)
                // props.history("/")
                // console.log(userGlobal)
            })
    },[setUser])
    

    return (
        <div className="main-layout">
            <header>
            {/* bg="dark" variant="dark" */}
                <Navbar collapseOnSelect expand="lg"  className="nav-head" >
                    <Navbar.Brand href="/main" className="main-name nav-link">TAP_BID</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav nav-toggle"  />
                    <Navbar.Collapse id="responsive-navbar-nav ">
                        <Nav className="mr-auto nav-right-box">
                            <Nav.Link className="nav-link" as={Link} to="/main">Product</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} to="/add-product">Add Product</Nav.Link>
                            { user && (<Nav.Link className="nav-link" as={Link} to={`/my-product/${user.id}`}>My Product</Nav.Link>)}
                            <Nav.Link className="nav-link" as={Link} to="/chat">Community</Nav.Link>
                            {/* <Nav.Link href={`/my-product/${user.id}`}>My Product</Nav.Link> */}
                            
                        </Nav>
                        <Nav className="nav-left-box">
                            
                            {/* <Nav.Link eventKey={2} as={Link} to="/register">
                                Register
                            </Nav.Link> */}
                            
                            <Nav.Link className="userEmail">
                                { user ? (<p >{user.email}</p>):""}
                            </Nav.Link>
                            <Button href="/" onClick={logout}>Logout</Button>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                {/* <div className="hr-div">
                    <hr className="hr"/>

                </div> */}
                {/* <div class="ui divider"></div> */}
                <Jumbotron className="jumbo" fluid>
                    <Container className="jumbo-con">
                        <h1>Tap Bid</h1>
                        <h4>Contact</h4>
                        <p>
                            tapbid@tabbid.com
                        </p>
                    </Container>
                    
                </Jumbotron>     
                
            </footer>    
        </div>
    )
}
