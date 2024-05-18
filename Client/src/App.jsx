import React from "react"

import SignIn from "./pages/SignIn"
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Profile from  './pages/Profile'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/about" exact element={<About/>}/>
      <Route path="/sign-in" exact element={<SignIn/>}/>
      <Route path="/sign-up" exact element={<SignUp/>}/>
      <Route path="/profile" exact element={<Profile/>}/>
    </Routes>
   </Router>
  )
}

export default App
