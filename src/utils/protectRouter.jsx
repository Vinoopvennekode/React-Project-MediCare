import React from 'react'
import { Navigate } from 'react-router-dom'

function protectRouter(props) {
    if(localStorage.getItem('token')){
return props.children
    }
    if(!localStorage.getItem('token')){
        return <Navigate to="/login"/>
    }
 
}

export default protectRouter