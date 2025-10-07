import { Task } from '../models/taskModel';
import { createDocument } from '../../../repository/firestoreRepository';

/**
 * Service function to create a new task.
 * Adds timestamps and stores the task in Firestore.
 * 
 * @param taskData - Task data without id and timestamps
 * @returns Promise resolving to the created task with id and timestamps
 */
export const createTask = async (
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Task> => {
    // Add timestamps
    const now = new Date();
    const taskWithTimestamps = {
        ...taskData,
        createdAt: now,
        updatedAt: now
    };

    // Use repository to create document in 'tasks' collection
    const taskId = await createDocument<Task>('tasks', taskWithTimestamps);

    // Return complete task with id
    return {
        id: taskId,
        ...taskWithTimestamps
    };
};