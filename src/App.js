import React,{useState,useEffect} from 'react'
import AppRouter from './config/router'
import './App.css'

const App = () => {

  // const  [isLogined, setIsLogined] = useState(false)
  // useEffect(() => {
  //   const token = localStorage.getItem("token")

  //   if(!token){
  //     setIsLogined(false)
  //   }else{
  //     setIsLogined(true)
  //   }

  // },[])
    
//{useState,useEffect}
  

  return (
    <>
    <AppRouter />
    </>
  )
}

export default App