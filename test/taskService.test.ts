import { createTask } from '../src/api/v1/services/taskService';
import { addDocument } from '../src/api/v1/repository/firestoreRepository';

// Mock the repository function
jest.mock('../src/api/v1/repository/firestoreRepository');

describe('TaskService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock the addDocument to return a test ID
        (addDocument as jest.Mock).mockResolvedValue('test-id-123');
    });

    describe('createTask', () => {
        it('should create a task with timestamps and id', async () => {
            // Setup
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'high' as const,
                status: 'open' as const,
                dueDate: new Date('2025-12-31')
            };

            // Execute
            const result = await createTask(taskData);

            // Assert
            expect(result.id).toBe('test-id-123');
            expect(result.userId).toBe(taskData.userId);
            expect(result.title).toBe(taskData.title);
            expect(result.priority).toBe(taskData.priority);
            expect(result.status).toBe(taskData.status);
            expect(result.dueDate).toBe(taskData.dueDate);
            expect(result.createdAt).toBeInstanceOf(Date);
            expect(result.updatedAt).toBeInstanceOf(Date);
            expect(addDocument).toHaveBeenCalledWith('tasks', expect.objectContaining({
                ...taskData,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }));
        });

        it('should throw error if repository fails', async () => {
            // Setup
            const error = new Error('Database error');
            (addDocument as jest.Mock).mockRejectedValue(error);

            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'high' as const,
                status: 'open' as const,
                dueDate: new Date('2025-12-31')
            };

            // Execute & Assert
            await expect(createTask(taskData)).rejects.toThrow('Database error');
        });
    });
});