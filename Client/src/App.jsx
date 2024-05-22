import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PrivateRoute from "./components/user/PrivateRoute"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="/sign-in" exact element={<SignInPage/>}/>
      <Route path="/sign-up" exact element={<SignUpPage/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" exact element={<ProfilePage/>}/>
      </Route>
    </Routes>
   </Router>
  )
}

export default App
