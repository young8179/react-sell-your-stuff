import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, Table } from 'semantic-ui-react';
import MyProductCard from '../myproductCard/MyProductCard'
import "./MyProduct.css"

export default function MyProduct() {
    const { userID } = useParams();
    const [productsByUser, setProductsByUser] = useState([])
    const [complete, setComplete] = useState("")

    
    useEffect(() => {
      
            fetch(`/api/v2/products/productsByUser/${userID}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setProductsByUser(data)
                    
                })
        } , [userID])

        const fetchProduct = () =>{
            fetch(`/api/v2/products/productsByUser/${userID}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setProductsByUser(data)
                    
                })
        }

    return (
        <div className="container mt-5 ">
            <Grid divided className="mb-5 product-screen" inverted>
                <Grid.Row className="justify-content-center card-row" >
                    <Table color="orange" key="orange">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={5}>Image</Table.HeaderCell>
                                <Table.HeaderCell width={7}>Detail</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                
                            </Table.Row>
                        </Table.Header>
                        <Table.Body className="myproduct" inverted>
                            {productsByUser.map((productByUser, index) => {
                                return <MyProductCard key={productByUser.id} productByUser={productByUser} fetchProduct={fetchProduct}/>
                            })}
          
                        </Table.Body>
          


                    </Table>
                </Grid.Row>

            </Grid>
                                  {/* responsive mobil version */}
            <Grid divided className="mb-5 product-mobil" inverted>
                <Grid.Row className="justify-content-center card-row" >
                    <Table color="orange" key="orange">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={5}></Table.HeaderCell>
                                <Table.HeaderCell width={7}></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                
                            </Table.Row>
                        </Table.Header>
                        <Table.Body className="myproduct" inverted>
                            {productsByUser.map((productByUser, index) => {
                                return <MyProductCard key={productByUser.id} productByUser={productByUser} fetchProduct={fetchProduct}/>
                            })}
          
                        </Table.Body>
          


                    </Table>
                </Grid.Row>

            </Grid>

        </div>
    )
}
