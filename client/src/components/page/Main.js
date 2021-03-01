import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap'
import { Grid } from 'semantic-ui-react'
import topImg from "../img/7_Fotor.png"
import Product from '../product/Product'
import "./Main.css"

export default function Main() {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        // setSearchTerm(searchTerm)
        if(searchTerm){
            const filtered = products.filter(product =>{
                return product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
            })
            setProducts(filtered)
        }
        if(searchTerm.length < 1){
            loadProducts()
        }
    }
    const loadProducts = () => {
        fetch("/api/v2/products")
            .then(res => res.json())
            .then(data => {
                // setSearchTerm("")
                setProducts(data)
           
            })
    }
    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className="main-box ">
            <div>
                
                <Image className="top-img" src={topImg} fluid />
            </div>
            <div className="margin">
            
                <Form onSubmit = {handleSubmit}>
                    <Container>
                        <Row>
                            <Col sm={10}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter product name." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
                                    <Form.Text className="text-muted">
                                        Search for product.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col sm={2}>
                                <Button variant="primary" type="submit">
                                    search
                                </Button>
                            </Col>
                        </Row>
                    </Container>



                </Form>


            </div>
            <Grid divided className="main-card ">
                <Grid.Row className="   card-row " >
                    
                { products.map((product, index) => {
                return <Product key={product.id} product={product} />
            })}
                </Grid.Row>
            </Grid>
            
            
                            {/* <Image className="top-img" src={footerImg} fluid /> */}
            
        </div>
    )
}
