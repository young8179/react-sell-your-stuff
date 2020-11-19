import React from 'react'
import { Button, Card, CardHeader, Grid, Icon, Image, Label } from "semantic-ui-react"
import moment from 'moment';
import "./Product.css"
import { Link, NavLink } from 'react-router-dom';

export default function Product(props) {
    const { title, description, price, imageURL, complete, category, createdAt, id } = props.product
    return (
        
            <div className="m-5">
               

                    <Card className="card" >
                        <CardHeader className="card-header"></CardHeader>
                    
                    {complete === false ? (<Image alt="img " src={`/uploads/${imageURL}`} wrapped ui={false} />):
                    (<Image alt="img " src={`/uploads/${imageURL}`} wrapped ui={false} 
                    label={{
                        as: 'a',
                        color: 'red',
                        content: 'Ended',
                        icon: 'handshake',
                        ribbon: true,
                        size: "big"
                      }} />)
                    }
                    
                        
                        <Card.Content className="card-main">
                            <Card.Header>{title}</Card.Header>
                            <Card.Meta>
                                <span className='date'>posted {moment(createdAt).fromNow()}</span>
                            </Card.Meta>
                            <Card.Description>
                               
                                {description.length > 40 ? description.slice(0, 60) : description}
                            </Card.Description>
                            <Card.Description as="h3" className="text-primary">
                                ${price}
                            </Card.Description>
                        </Card.Content>
                        <Card.Description className="ml-3 mb-3 mr-3 ">
                            <Button basic color='black' content='Black' className="detail-btn"><NavLink as={Link} to={`/main/${id}`}>Detail</NavLink></Button>
                        </Card.Description>
                        <Card.Content extra>
                            <a>
                                <Icon name='cart' />
                                {category}
                            </a>
                        </Card.Content>
                    </Card>
                
            
        </div>
    )
}
