import { Request, Response, NextFunction } from 'express';
import { createTask as createTaskService } from '../services/taskService';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Controller function to handle task creation.
 * 
 * @param req - Express request object containing task data in body
 * @param res - Express response object
 * @param next - Express next function for error handling
 */
export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Call the service layer to create the task
        const newTask = await createTaskService(req.body);

        // Send success response with 201 Created status
        res.status(HTTP_STATUS.CREATED).json(newTask);
    } catch (error) {
        // Pass any errors to the global error handler
        next(error);
    }
};