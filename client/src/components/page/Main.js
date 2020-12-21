import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Grid } from 'semantic-ui-react'
import topImg from "../img/7_Fotor.png"
import Product from '../product/Product'
import "./Main.css"

export default function Main() {
    const [products, setProducts] = useState([])

    const loadProducts = () => {
        fetch("/api/v2/products")
            .then(res => res.json())
            .then(data => {
              
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
