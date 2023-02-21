import React from 'react'
import { Navigate } from 'react-router-dom'

function publicRouter(props) {
    if(!localStorage.getItem('token')){
return props.children
    }
    if(localStorage.getItem('token')){
        return <Navigate to="/home"/>
    }
 
}

export default publicRouter