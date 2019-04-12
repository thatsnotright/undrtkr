import { FETCH_FAILURE, FETCH_SUCCESS } from './actionTypes';
import * as R from 'ramda';

const initialState = {
    incomplete: [],
    tasks: [],
};

const isIncomplete = task => task && !task.complete;

export default function taskReducer(state = initialState, {type, payload}) {
    switch(type) {
        case FETCH_FAILURE:
        break;
        case FETCH_SUCCESS:{
            const { results: tasks } = payload;
            return {...state, tasks, incomplete: R.filter(isIncomplete, tasks)};
        }
        default:
            return state;
    }
}
