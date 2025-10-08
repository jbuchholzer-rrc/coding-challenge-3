import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { createTaskSchema } from "../validation/taskValidation";
import { createTask } from "../controllers/taskcontroller";

// Set up Express router
const router = Router();

// Define POST / route for creating tasks
// Apply validation middleware, then connect to controller
router.post("/", validate(createTaskSchema), createTask);

export default router;