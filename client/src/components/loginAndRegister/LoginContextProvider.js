import React, { createContext, useEffect, useState } from 'react'
export const LoginContext = createContext({
    user:{},
    setUser: () =>{},
    

    
})
export default function LoginContextProvider(props) {
    const [user, setUser ] = useState([])
    const [myProduct, setMyProduct] = useState("")
    useEffect(()=>{
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                if(!data.error){
                    setUser(data)
                    setMyProduct("My product")

                }
                    
          
            })
    },[])
    return (
        <LoginContext.Provider value={{user, setUser, myProduct, setMyProduct}}>
            {props.children}
        </LoginContext.Provider>
    )
}
