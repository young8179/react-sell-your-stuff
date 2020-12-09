import React, { createContext, useEffect, useState } from 'react'
export const LoginContext = createContext({
    user:{},
    setUser: () =>{}
})
export default function LoginContextProvider(props) {
    const [user, setUser ] = useState([])

    useEffect(()=>{
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                if(!data.error){
                    setUser(data)
                }
                    
          
            })
    },[])
    return (
        <LoginContext.Provider value={{user, setUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}
