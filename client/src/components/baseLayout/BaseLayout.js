import React, { useState, useEffect, useContext } from 'react'
import { Button, Image, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
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
        
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                if(!data.error){
                    setUser(data)
                }

                
               
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
                            <Nav.Link className="nav-link" as={Link} to="/chat">Live Chat</Nav.Link>
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
                <Jumbotron className="jumbo jumbo-screen" fluid>
                    <Container className="jumbo-con">
                        <div className="row justify-content-center mb-2">
                            <div className="col-12 mb-5">
                                <h1 className="text-center mb-5">TAP_BID</h1>

                            </div>
                        </div>


                        <div className="row ">
                            <div className="col-md-4  ">
                                
                                <p className="text-center">Contact</p>
                                <p className="text-center">
                                    tapbid@tabbid.com
                                </p>

                            </div>
                            <br/>
                            <div className="col-md-4 ">
                                
                                <p className="text-center">Copyright</p>
                                <p className="text-center">
                                    Copyright@ 2020 Heeyoung Song
                                </p>
                            </div>
                            <br/>
                            <div className="col-md-4 ">
                            <p className="text-center">Location</p>
                                <p className="text-center">
                                    Atlanta GA
                                </p>
                            </div>

                        </div>
                    </Container>
                    
                </Jumbotron>

                {/* jumbo mobile=========================================================================== */}
                <Jumbotron className="jumbo jumbo-mobile" fluid>
                    <Container className="jumbo-con container">
                        

                        <div className="row justify-content-center">
                           
                            <br/>
                            <div className="col-4 ">
                                
                                
                                <p className="text-center">
                                    Copyright@ 2020 Heeyoung Song
                                </p>
                            </div>
                            {/* <br/>
                            <div className="col-4 ">
                            
                                <p className="text-center">
                                    Atlanta GA
                                </p>
                            </div>
                            <div className="col-4  ">
                                
                                
                                <p className="text-left">
                                    tapbid@tabbid.com
                                </p>

                            </div> */}

                        </div>
                    </Container>
                    
                </Jumbotron>     
                
            </footer>    
        </div>
    )
}
