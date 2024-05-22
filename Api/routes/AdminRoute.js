import express from 'express'
import {verifyAdminToken} from '../utils/verifyAdmin.js'
import { adminLogin,adminSignOut,updateUser,deleteUser,createUser,getAllUsers,getUser } from '../controllers/adminController.js'

const adminRouter = express.Router()


adminRouter.post("/signin",adminLogin)
adminRouter.get("/allUsers", verifyAdminToken, getAllUsers)
adminRouter.get("/getUser/:userId", verifyAdminToken, getUser)
adminRouter.post("/updateUser/:userId", verifyAdminToken, updateUser)
adminRouter.delete("/deleteUser/:userId", verifyAdminToken, deleteUser)
adminRouter.post("/createUser", verifyAdminToken, createUser)
adminRouter.get("/signOut", verifyAdminToken, adminSignOut)





export default adminRouter