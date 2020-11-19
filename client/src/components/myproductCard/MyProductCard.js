import React, { useState } from 'react'
import { Button, Card, Form, Grid, Image, Label, Modal, Table } from 'semantic-ui-react'
import moment from 'moment';
import "./MyProductCard.css"
import { useHistory } from 'react-router-dom';


export default function MyProductCard(props) {
    const { title, description, price, imageURL, createdAt, category, complete, id } = props.productByUser
    const [formOpen, setFormOpen] = useState(false)  
    // edit 
    const url = ""
    const [new_imageURL, setNew_imageURL ] = useState(imageURL)
    const [new_title, setNew_title ] = useState(title)
    const [new_description, setNew_description ] = useState(description)
    const [new_price, setNew_price ] = useState(price)
    const [new_category, setNew_category ] = useState(category)
    const [new_complete, setNew_complete ] = useState(complete)
    // const [new_imageURL, setNew_ImageURL ] = useState("")
    const history = useHistory();

    const handleEdit = (productId) => {
        
        fetch(`/api/v2/products/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ 
                title: new_title,
                description: new_description,
                price: new_price,
                category: new_category,
                imageURL: new_imageURL.imageURL
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                props.fetchProduct()
                history.push(`/main`)

            })
    }

    const handlePhoto = async e =>{
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        
        const res = await fetch("/api/v2/products/upload",{
            method: "POST",
            body: data
        })
        const file = await res.json()
       
            setNew_imageURL(file)
       
        console.log(new_imageURL)
        console.log(imageURL)
    }

    const completed = (productId) => {
        fetch(`/api/v2/products/${productId}`, {
            method: "PUT",
            body: JSON.stringify({
                complete: !complete,
                // imageURL: imageURL
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                props.fetchProduct()
            })

    }

    const remove = (productId) => {
        fetch(`/api/v2/products/${productId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                fetch("/api/v2/products")
                    .then(res => res.json())
                    .then(data => {
                        props.fetchProduct()
                    })
            })
    }


    return (
        <>
            <Table.Row className="table-row" inverted >

                <Table.Cell>
                    {/* { complete === false ? (<Image src={`/uploads/${imageURL}`} size='medium' rounded />)
                :<Image src={`/uploads/${imageURL}`} size='medium' rounded 
                label={{
                    as: 'a',
                    color: 'blue',
                    content: 'Ended',
                    icon: 'spoon',
                    ribbon: true,
                  }}/>} */}

                    <Image src={`/uploads/${imageURL}`} size='medium' rounded
                    />
                </Table.Cell>
                <Table.Cell inverted>
                    <h2 className="mt-3">{title} {complete === true ? (<Label as='a' color='red' tag className="mb-5">Ended </Label>)
                        : ""}</h2>
                    
                    <h5><span className="spanD">Detail:</span> <br /></h5>
                    <h6 className="detail">{description}</h6>
                    {/* {complete === true ? (<h3>Ended</h3>): <h3 className="mb-3 price">${price}</h3>} */}
                    <h3 className="mb-3 price">${price}</h3>

                </Table.Cell>

                <Table.Cell className="table-row" textAlign='right'>


                    <br />
                    <Modal
                onClose={() => setFormOpen(false)}
                onOpen={() => setFormOpen(true)}
                open={formOpen}
                trigger={<Button positive>Edit</Button>}
            >
                <Modal.Header>Edit Post</Modal.Header>
                <Modal.Content scrolling>
                
                    <Form id="editPostForm" onSubmit={() => handleEdit(id)}>
                        <Form.Field>
                            <Image src={`/uploads/${imageURL}`} size='medium' rounded />
                            <h4 className="mb-5">Current Image</h4>
                            <input type="file"  name="photo" onChange={handlePhoto} />
                            {new_imageURL ? (<img alt="product img" src={`/uploads/${new_imageURL.imageURL}`} style={{ width: "400px" }} />) : ""}
                            
                            <label>Title</label>
                            <input placeholder='title' value={new_title} onChange={(e) => { setNew_title(e.target.value) }} />
                        </Form.Field>
                        <Form.TextArea label='Description' placeholder='Detail about product' value={new_description} onChange={(e) => { setNew_description(e.target.value) }} />
                        <Form.Field>
                            <label>Price</label>
                            <input placeholder='$' value={new_price} onChange={(e) => { setNew_price(e.target.value) }} />
                        </Form.Field>
                        <select value={new_category} onChange={(e) => { setNew_category(e.target.value) }}>
                            <option value="Category">Category</option>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                            <option value="Trade">Trade</option>
                        </select>
               
 
                        <Form.Field>
                            {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
                        </Form.Field>


                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setFormOpen(false)}>Cancel</Button>
                    <Button positive form="editPostForm">submit</Button>
                </Modal.Actions>


            </Modal>
                    <br />
                    <br />
                    <Button className="button" negative onClick={() => remove(id)}>Remove</Button>
                    <br />
                    <br />
                    <Button className="button" onClick={() => completed(id)}>Complete</Button>
                </Table.Cell>

            </Table.Row>


            
        </>

    )
}
