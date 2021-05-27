import React, { useContext, useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
// import io from "socket.io-client"
import "./Chat.css"
import { ChatContext } from "../chatStore/Store"
import { LoginContext } from '../loginAndRegister/LoginContextProvider'




export default function Chat() {

    const {chatContext, sendChatAction} = useContext(ChatContext)
    const {user, setUser} = useContext(LoginContext)


    const topic = Object.keys(chatContext)

   
    const [activeTopic, setActiveTopic] = useState(topic[0])
    const [textValue, setTextValue] = useState("")
    const [textApi, setTextApi] = useState("")
    const [category, setCategory] = useState("")
    const [chat, setChat] = useState([])
    const [time, setTime] = useState("")
    
 
    const storeChat = (e)=>{
        e.preventDefault()
        fetch(`/api/v2/chats`, {
            method: "POST",
            body: JSON.stringify({
                content: textValue,
                category: activeTopic,
                
                
                
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data =>{
            // setChat(data);

            setTime(data.createdAt)
            setTextApi("")
            sendChatAction({from: user.name, msg: textValue, topic: activeTopic });
            setTextValue("")
                  
           
        })
        
    }
    // useEffect(()=>{
    //     fetch("/api/v2/chats")
    //     .then(res=>res.json())
    //     .then((data) => {
    //         for (let i = 0; i < data.length; i++) {
    //             if(data.category==="Buy"){
    //                 initState.Buy[i].msg = data.content
    //             }else if(data.category==="Sell"){
    //                 initState.Sell[i].msg = data.content
    //             }else if(data.category==="Trade"){
    //                 initState.Trade[i].msg = data.content
    //             }
    //         }
    //     })
    // },[])


    // const time = document.getElementById("time")
    // time.reload()  


    // setInterval(function(){ 
    //     const time = document.getElementById("time")
    //     time.reload()
        
    //  }, 1000);

        // const time = document.getElementById("time")
        // time.reload()

    // useEffect(()=>{
    //     document.getElementById("time").reload()
        
    // },[chatContext])

    useEffect(()=>{
        const box = document.getElementById('chat-box');
        box.scrollTop = box.scrollHeight;
 
    },[chatContext])  
            

    // useEffect(()=>{
        
        
    //     fetch("/api/v2/chats")
    //         .then(res=>res.json())
    //         .then((data) => {
    //             setChat(data)
                
               
    //         })
            
    // },[setChat])   

    useEffect(()=>{
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                setUser(data)
                
            })
    },[setUser])


    return (
        <div>
            <div className="container mt-5 mb-5 ">
                <div className="row chat-row bg-dark top justify-content-center ">
                    <h2 className="text-white chat-head">Tap Bid Chat({activeTopic})</h2>
                </div>
                <div className="row chat-row main ">
                    <div className="col-3 col-md-3 chat-main-left">
                        <h2 className="chat-main-left-text">Topic:</h2>
                            {topic.slice(0,3).map((topic)=>{
                                return <>
                                <button onClick={e => setActiveTopic(e.target.innerText)} className="topic-btn">
                                    {topic}
                                </button>
                                <br/>
                                </>
                            })}
                    </div>
                    <div className="col-9 col-md-9 chat-box" id="chat-box">
                        <List className="mt-5" size="big">
                            {chatContext[activeTopic].map((text)=>{
                                return <> 
                                {text.from === user.name ? (<List.Item className="text-right chat-text">
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                <List.Content className="text-left">
                                    <List.Header className="text-left" as='a'>{text.from}</List.Header>
                                    <List.Description>
                                        <p>{text.msg} </p>
                                        {/* <span id="time" className="time">{moment(chat.createdAt).fromNow()}</span>ß */}
                                        
                                    </List.Description>
                                </List.Content>
                            </List.Item>): (<List.Item className="chat-text">
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                    <List.Content>
                                        <List.Header as='a'>{text.from}</List.Header>
                                        <List.Description>
                                            <p>{text.msg} </p>
                                            {/* <span className="time">{moment(time).fromNow()}</span> */}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>)} 
                                
                                </>
                            })}
                            

                        </List>
                    </div>
                </div>
                <div className="row chat-row bottom mt-3 justify-content-center">
                    <form onSubmit={storeChat} className="col-12">
                        <div className="row chat-row justify-content-center">
                            <input id="myInput" value={textValue} className="chat-input col-md-10 col-9" type="text" name="message"
                                    onChange={(e)=> setTextValue(e.target.value)}/>
                            <button type="submit" id="myBtn" className="col-md-1 col-2 btn btn-primary btn-send" >Send</button>              
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
