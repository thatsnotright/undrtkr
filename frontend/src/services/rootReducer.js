import combineReducers from 'combine-reducers-global-state';
import taskReducer from './tasks/reducer';

const createRootReducer = () => {
    return combineReducers({
        tasks: taskReducer,
    });
}

export { createRootReducer };