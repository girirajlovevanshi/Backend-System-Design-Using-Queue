import { Router } from "express";
import { checkHealth } from "../utils/health.js";

const textRouter = Router()


textRouter.get('/health', checkHealth)

export default textRouter