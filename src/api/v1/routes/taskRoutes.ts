import { Router } from "express";
import { validateTask } from "../middleware/validationMiddleware";
import { createTask } from "../controllers/taskController";

// Set up Express router
const router = Router();

// Define POST / route for creating tasks
// Apply validation middleware, then connect to controller
router.post("/", validateTask, createTask);

export default router;