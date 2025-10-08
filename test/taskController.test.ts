import { Request, Response, NextFunction } from 'express';
import { createTask } from '../src/api/v1/controllers/taskcontroller';
import { createTask as createTaskService } from '../src/api/v1/services/taskService';
import { HTTP_STATUS } from '../src/constants/httpConstants';

// Mock the service function
jest.mock('../src/api/v1/services/taskService');

describe('TaskController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    describe('createTask', () => {
        it('should create a task and return 201 status', async () => {
            // Setup
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'high',
                status: 'open',
                dueDate: new Date('2025-12-31')
            };

            const createdTask = {
                id: 'test-id-123',
                ...taskData,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            req.body = taskData;
            (createTaskService as jest.Mock).mockResolvedValue(createdTask);

            // Execute
            await createTask(req as Request, res as Response, next);

            // Assert
            expect(createTaskService).toHaveBeenCalledWith(taskData);
            expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(res.json).toHaveBeenCalledWith(createdTask);
            expect(next).not.toHaveBeenCalled();
        });

        it('should call next with error if service fails', async () => {
            // Setup
            const error = new Error('Service error');
            req.body = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'high',
                status: 'open',
                dueDate: new Date('2025-12-31')
            };
            (createTaskService as jest.Mock).mockRejectedValue(error);

            // Execute
            await createTask(req as Request, res as Response, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});
