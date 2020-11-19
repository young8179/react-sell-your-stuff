import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Grid, GridColumn, Header } from 'semantic-ui-react'
import footerImg from "../img/2-2.png"
import topImg from "../img/7_Fotor.png"
import Product from '../product/Product'
import "./Main.css"

export default function Main() {
    const [products, setProducts] = useState([])
    // const [user, setUser] = useState([])

    const loadProducts = () => {
        fetch("http://localhost:3000/api/v2/products")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data)
                // setUser(data[1].UserId)
                // console.log(data)
                // console.log(user)
            })
    }
    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className="main-box">
            <div>
                
                <Image className="top-img" src={topImg} fluid />
            </div>
            {/* <Grid >
                <Grid.Column centered>
                    <Header as='h1'>Product</Header>
                </Grid.Column>

                
            </Grid> */}

            <Grid divided className="main-card">
                <Grid.Row className="justify-content-start pl-5 ml-5 card-row" >
                { products.map((product, index) => {
                return <Product key={product.id} product={product} />
            })}
                </Grid.Row>
            </Grid>
            
            
                            {/* <Image className="top-img" src={footerImg} fluid /> */}
            
        </div>
    )
}
