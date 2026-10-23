import { createContext, useState } from "react";


export const AuthContext = createContext()

export const AuthStore = ({children})=>{
    const [user,setUser] = useState(null)
    const [accessToken,setAccessToken] = useState(null)
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const [product,setProduct] = useState([])
    
    const value = {user,setUser,accessToken,setAccessToken,error,setError,isLoading,setIsLoading,product,setProduct}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}