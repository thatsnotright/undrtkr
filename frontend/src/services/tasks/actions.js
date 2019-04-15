import {
    FETCH_TASKS,
    FETCH_FAILURE,
    FETCH_SUCCESS,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './actionTypes'

export const fetchTasks = () => ({
    type: FETCH_TASKS,
});

export const fetchFailed = () => ({
    type: FETCH_FAILURE,
});

export const fetchSuccess = (data) => ({
    type: FETCH_SUCCESS,
    payload: data,
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
export const updateTask = (url, { description, priority, points, parentTask, dueDate, complete }) => ({
    type: UPDATE_TASK,
    payload: {
        url,
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
export const deleteTask = (url) => ({
    type: DELETE_TASK,
    payload: {
        url,
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