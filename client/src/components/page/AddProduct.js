import React, { useContext, useState } from 'react'
import "./AddProduct.css"
import { Button, Form, Message } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { LoginContext } from '../loginAndRegister/LoginContextProvider'
import { useEffect } from 'react'



const options = [
    { key: 'b', text: 'Buy', value: 'Buy' },
    { key: 's', text: 'Sell', value: 'Sell' },
    { key: 'T', text: 'Trade', value: 'Trade' },
  ]

export default function AddProduct() {
    const [title, setTitle ] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice ] = useState("")
    const [imageURL, setImageURL ] = useState("")
    const [complete, setComplete ] = useState(false)
    const [category, setCategory] = useState("")
    const history = useHistory();
    const [error, setError] = useState("")
    const {user, setUser} = useContext(LoginContext)

    
    const handlePhoto = async e =>{
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "uploads")
        const res = await fetch("/api/v2/products/upload",{
            method: "POST",
            body: data
        }) 
        const file = await res.json()
        setImageURL(file.imageURL)
 
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("/api/v2/products",{
            method: "POST",
            body: JSON.stringify({
               title: title,
               description: description,
               price:price,
               imageURL:imageURL,
               complete: false,
               category: category 
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
            
            .then(data => {
                if(!user.name){
                    alert("Please login first")
                    console.log(error)
                    // setError(data.error)
                }else{
                    setTitle("")
                    setDescription("")
                    setPrice("")
                    setImageURL("")
                    setComplete("")
                    setCategory("")
                    
                    history.push("/main")

                }
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
console.log(user)
    return (
        
        <div className="adding-box container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-7">
                <Form onSubmit={handleSubmit} inverted>
                <Form.Field>
                {error ? (<Message
                        error
                        header='No account info'
                        content='Please login first'
                    />) : ("")}
                    <input type="file" name="photo"  onChange={handlePhoto} multiple/>
                    { imageURL ? (<img className="mt-4 mb-4" alt="product img"src={imageURL}  style={{width: "400px"}}/>) : ""}
                    
                    <label className="">Title</label>
                    <input placeholder='title' value={title} onChange={(e)=> {setTitle(e.target.value)}}  />
                </Form.Field>
                <Form.TextArea color="white" label='Description' placeholder='Detail about product' value={description} onChange={(e)=> {setDescription(e.target.value)}}/>
                
                <Form.Field>
                    <label className="">Price</label>
                    <input placeholder='$' value={price} onChange={(e, data)=> {setPrice(e.target.value)}}/>
                </Form.Field>
                <select value={category} onChange={(e)=> {setCategory(e.target.value)}}>            <option value="Category">Category</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Trade">Trade</option>
          </select>
                {/* <Form.Select
            fluid
            label='Category'
            options={options}
            placeholder='Select'
            
            onChange={(e)=> {setCategory(e.target.option)}} 
          /> */}
                <Form.Field>
                    {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
                </Form.Field>
                <Button type='submit'> submit </Button>
                {/* <NavLink to="/main">Submit</NavLink> */}
            </Form>
                </div>

            </div>
            
            
            
        </div>
    )
}
