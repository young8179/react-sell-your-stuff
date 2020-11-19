import React, { useContext, useEffect, useState } from 'react'
import { Image, List } from 'semantic-ui-react'
// import io from "socket.io-client"
import "./Chat.css"
import { ChatContext } from "../chatStore/Store"
import { LoginContext } from '../loginAndRegister/LoginContextProvider'
import moment from 'moment';



export default function Chat() {

    const {chatContext, sendChatAction} = useContext(ChatContext)
    const {user, setUser} = useContext(LoginContext)
    // console.log(chatContext)

    const topic = Object.keys(chatContext)
    //local state
    // chatContext.from = user.name
   
    const [activeTopic, setActiveTopic] = useState(topic[0])
    const [textValue, setTextValue] = useState("")
    // const [activeUser, setActiveUser] = useState(user.name)
    const [textApi, setTextApi] = useState("")
    const [category, setCategory] = useState("")
    const [chat, setChat] = useState([])
    // console.log(chatContext)

    // useEffect(()=>{
    //     socket = io(CONNECTION_PORT)
    // },[])

    // chatContext[activeTopic] = textApi
    const storeChat = (topic)=>{
        fetch(`/api/v2/chats`, {
            method: "POST",
            body: JSON.stringify({
                content: textValue,
                category: topic,
                
                
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data =>{
            // setChat(data);
            setTextApi("")
            const box = document.getElementById('chat-box');
            box.scrollTop = box.scrollHeight;
        })
    }
            
            
    useEffect(()=>{
        fetch("/api/v2/chats")
            .then(res=>res.json())
            .then((data) => {
                setChat(data)
                // props.history("/") 
                // console.log(userGlobal)
            })
            
    },[setChat])   

    useEffect(()=>{
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                setUser(data)
                // props.history("/")
                // console.log(userGlobal)
            })
    },[setUser])

    
    
    // const input = document.getElementById("myInput");
    // input.addEventListener("keyup", function (event) {
        
    //     if (event.keyCode === 13) {

    //         event.preventDefault();

    //         document.getElementById("myBtn").click();
    //     }
    // });



    // document.on("keypress", "input", function(e){
    //     if(e.which == 13){
    //         var inputVal = this.val();
            
    //     }
    // })


    // const handleDown = (e) => {
    //     if (e.keyCode === '13') {
    //       console.log('do validate');
    //     }
    //   }
  
    
        const handleDown = (event) => {
          if (event.key === 'Enter') {
            console.log('do validate')
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
                sendChatAction({from: user.name, msg: textValue, topic: activeTopic });
                setTextValue("")
                setTextApi("")
                const box = document.getElementById('chat-box');
                box.scrollTop = box.scrollHeight;
            })
          }
        }
       

    return (
        
        <div>
            <div className="container mt-5 mb-5 ">
                <div className="row bg-dark top justify-content-center ">
                    <h2 className="text-white chat-head">Tap Bid Chat({activeTopic})</h2>
                </div>
                <div className="row main ">
                    <div className="col-3 main-left">
                        <h2>Topic:</h2>
                            {topic.slice(0,3).map((topic)=>{
                                return <>
                                <button onClick={e => setActiveTopic(e.target.innerText)} className="topic-btn">
                                    {topic}
                                </button>
                                <br/>
                                </>
                            })}
                    </div>
                    <div className="col-9 chat-box" id="chat-box">
                        <List className="mt-5" size="big">
                            {chatContext[activeTopic].map((text)=>{
                                return <> 
                                {text.from === user.name ? (<List.Item className="text-right">
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                <List.Content className="text-left">
                                    <List.Header className="text-left" as='a'>{text.from}</List.Header>
                                    <List.Description>
                                        <p>{text.msg} <span className="time">{moment(chat.createdAt).fromNow()}</span></p>
                                    </List.Description>
                                </List.Content>
                            </List.Item>): (<List.Item >
                                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                    <List.Content>
                                        <List.Header as='a'>{text.from}</List.Header>
                                        <List.Description>
                                            <p>{text.msg} <span className="time">{moment(chat.createdAt).fromNow()}</span></p>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>)} 
                                
                                </>
                            })}

                        </List>
                    </div>
                </div>
                <div className="row bottom mt-3 justify-content-center">
                <input id="myInput" value={textValue} className="chat-input col-10" type="text" name="message"
                        onChange={(e)=> setTextValue(e.target.value)} 
                        onKeyPress={handleDown}/>
                    <button id="myBtn" className="col-1 btn btn-primary btn-send"
                            onClick={()=> {
                                storeChat(activeTopic);
                                sendChatAction({from: user.name, msg: textValue, topic: activeTopic });
                                setTextValue("")
                            }}
                    >Send</button>
                </div>
            </div>
        </div>
    )
}
