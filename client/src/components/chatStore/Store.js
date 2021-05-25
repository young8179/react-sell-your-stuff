import React, { createContext, useEffect, useReducer } from 'react'
import io from "socket.io-client"


export const ChatContext = createContext()


const initState = {
    Buy: [
        { from: "Tap Bid", msg: "Hello, Welcome to Tap Bid" },

    ],
    Sell: [
        { from: "Tap Bid", msg: "Hello, Welcome to Tap Bid" },

    ],
    Trade: [
        { from: "Tap Bid", msg: "Hello, Welcome to Tap Bid" },

    ]
}



function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        //case set data
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state
    }
}











let socket = io()

export default function Store(props) {
    const [chatContext, dispatch] = useReducer(reducer, initState)


    function sendChatAction(value) {
        socket.emit("message", value)
    }





    useEffect(() => {
        socket.on("message", function (msg) {
            dispatch({ type: "RECEIVE_MESSAGE", payload: msg })
        })

    }, [])




    return (
        <ChatContext.Provider value={{ chatContext, sendChatAction }}>
            {props.children}
        </ChatContext.Provider>
    )
}
