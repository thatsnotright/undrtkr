import {
    FETCH_TASKS,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './actionTypes'

export const fetchTasks = () => ({
    type: FETCH_TASKS,
});

/**
 * Create a new task
 *
 * @param {string} description The Task
 * @param {string} priority High Medium Low
 * @param {number} points between 0 and 11
 * @param {URL} parentTask the URL ID of the parent task
 * @param {Date} dueDate A due date if applicable
 */
export const createTask = (description, priority, points, parentTask, dueDate) => ({
    type: CREATE_TASK,
    payload: {
        description,
        priority,
        points,
        parentTask,
        dueDate,
    },
});

/**
 * Update an existing task
 *
 * @param {URL} id The Task
 * @param {string} description The description, null if unchanged
 * @param {string} priority High Medium Low, null if unchanged
 * @param {number} points between 0 and 11, null if unchanged
 * @param {URL} parentTask the URL ID of the parent task, null if unchanged
 * @param {Date} dueDate A due date if applicable, null if unchanged
 * @param {boolean} complete If the task is done
 */
export const updateTask = (id, description, priority, points, parentTask, dueDate, complete) => ({
    type: UPDATE_TASK,
    payload: {
        id,
        description,
        priority,
        points,
        parentTask,
        dueDate,
        complete,
    },
});

/**
 * Delete an existing task
 * @param {URL} id 
 */
export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: {
        id,
    },
});

/**
 * Mark a task as completed
 * @param {URL} id 
 */
export const completeTask = (id) => ({
    type: UPDATE_TASK,
    payload: {
        id,
        complete: true,
    },
});