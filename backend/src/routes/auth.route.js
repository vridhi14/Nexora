import express from "express"
const router = express.Router();
import {checkAuth} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

router.get("/check", protectRoute , checkAuth)

export default router ;