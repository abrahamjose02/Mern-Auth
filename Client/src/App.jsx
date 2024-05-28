import React from "react"

import SignIn from "./pages/SignInPage"
import Home from './pages/HomePage'
import SignUp from './pages/SignUpPage'
import Profile from  './pages/ProfilePage'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import PrivateRoute from "./components/user/PrivateRoute"
import PrivateRouteAdmin from './components/Admin/PrivateRouteAdmin'
import DashboardAdminPage from "./pages/DashboardAdminPage"
import SignInAdminPage from "./pages/SignInAdminPage"
import CreateUser from "./components/Admin/CreateUser"
import EditUserAdminPage from './pages/EditUserAdminPage';



function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/sign-in" exact element={<SignIn />}/>
      <Route path="/sign-up" exact element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" exact element={<Profile/>}/>
      </Route>
      <Route path="/admin/signin" element={<SignInAdminPage/>}/>
        <Route element={<PrivateRouteAdmin/>}>
      <Route path="/admin/dashboard" element={<DashboardAdminPage/>}/>
      </Route>
      <Route path="/admin/createNewUser" element={<CreateUser/>}/>
      <Route path="/admin/editUser/:userId" element={<EditUserAdminPage/>}/>
    </Routes>
   </Router>
  )
}

export default App