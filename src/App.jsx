import React from "react"
import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"

function App() {


  return (
    <>
      <Navbar/>
      <Manager/>
      <Footer/>
      <Toaster/>


    </>
  )
}

export default App
