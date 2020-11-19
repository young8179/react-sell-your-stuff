import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import "./ProductDetail.css"
import { Button } from 'semantic-ui-react';
import { LoginContext } from '../loginAndRegister/LoginContextProvider';
import "foundation-sites"
import moment from 'moment';


export default function ProductDetail() {
    const { productId } = useParams()
    const [productDetail, setProductDetail] = useState([])
    const [comments, setComment] = useState([])
    const [userP, setUserP] = useState([])
    // const {user, setUser} = useContext(LoginContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    const removeComment=(commentId)=>{
      fetch(`/api/v2/comments/${commentId}`,{
        method: "DELETE"
      })
      .then(res=>res.json())
      .then(data=>{
        fetch(`/api/v2/products/${productId}/comments`)
          .then(res => res.json())
          .then(res =>{
              setComment(res)
          })
      })
    }

    const commentSubmit = (e) =>{
      e.preventDefault()  
      fetch(`/api/v2/products/${productId}/comments`, {
          method: "POST",
          body: JSON.stringify({
              title: title,
              description: description,
              
              
          }),
          headers:{
              "Content-Type": "application/json"
          }
      })
      .then(res=> res.json())
      .then(data =>{
          
          setComment(comments.concat(data.comment));
          setTitle("")
          setDescription("")
      })
  }
          
          


    const loadProduct = () =>{
        fetch(`http://localhost:3000/api/v2/products/${productId}`)
            .then(res=>res.json())
            .then(data=>{
                setProductDetail(data)
                console.log(data)
                fetch(`http://localhost:3000/api/v2/products/${productId}/comments`)
                    .then(res=> res.json())
                    .then(comment=>{
                        setComment(comment)
                        fetch(`http://localhost:3000/api/v2/users/user/${data.UserId}`)
                            .then(res=>res.json())
                            .then(users =>{
                                setUserP(users)
                            })
                    })
            })
    }


    useEffect(() => {
        loadProduct()
    }, [])

    useEffect(()=>{
      fetch(`/api/v2/products/${productId}/comments`)
          .then(res => res.json())
          .then(data =>{
              setComment(data)
          })
  }, [productId])
    return (
        <div>
            
<div className=" container">
        <div className="row justify-content-center mt-5">
            <div className="medium-6 col-5">
              <img className="thumbnail" src={`/uploads/${productDetail.imageURL}`} alt="dd"/>
              
            </div>
            <div className="medium-6 large-5 col-7">
                <h3 className="text">{productDetail.title}</h3>
                <p className="text">{productDetail.description}</p>
                <div className="row">
                
                  <div className="small-9 columns">
                    <h6 className="text" id="middle-label" >Price: {productDetail.price}</h6>
                  </div>
                  <a href={`mailto: ${userP.email}`} className="m-5 button large expanded button-tap">Tap</a>
                </div>
      
              </div>

        </div>
        
         
  
  
          
  
      <div className="row comment-container">
        <hr/>
        
        <div className="tabs-content col-12 mt-5 mb-5 p-5 comment-box text" data-tabs-content="example-tabs">
          <div className="tabs-panel is-active row " id="panel1">
            <h1 className="text">Comments</h1>
            
                <ul className="col-12 comment-list">
                {comments.map((comment)=>{
                    return <li className="ml-4">
                       <h4 className="text">💬 <span className="comment-name">{comment.title}:</span> {comment.description} <span className="comment-time">{moment(comment.createdAt).fromNow()}</span>
                       <Button color='red' size="mini" icon="trash alternate outline" circular className="m-2 x-button" 
                          onClick={ () => removeComment(comment.id)}/>
                       </h4>
                       

                    </li>  
                     
              
                                   })}
                </ul>
            <form onSubmit={commentSubmit} className="row">
                <label className="col-12 text nameAndComment"> 
                  Name <br/>
                  <input className="name-text col-12" value={title} placeholder="Name" onChange={(e)=> {setTitle(e.target.value)}}></input>
                </label>
                <label className="col-12 text nameAndComment" > 
                  Comments
                  <textarea className="review-text col-12" value={description} placeholder="Comment" onChange={(e)=> {setDescription(e.target.value)}}></textarea>
                </label>
                <br />
                <input type="submit" value="submit" className="submit btn btn-danger mt-2 ml-3"/>
            </form>
          </div>
          
        </div>
      </div>
  
    </div>
        </div>
    )
}
                  
                  
                
                
