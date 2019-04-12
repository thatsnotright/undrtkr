import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TASKS,
    CREATE_TASK,
} from './actionTypes';
import {
    fetchFailed,
    fetchSuccess,
} from './actions';

function* fetchTasks() {
    console.log('fetch!')
    try {
        const results = yield call(fetch, '/api/v1/tasks/', {
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = yield results.json();
        yield put(fetchSuccess(data));
    } catch (e) {
        yield put(fetchFailed());
    }
}

function* createTask(action) {
    console.log(action);
}

function* tasksSaga() {
    yield all([
        takeEvery(FETCH_TASKS, fetchTasks),
        takeEvery(CREATE_TASK, createTask),
    ]);
}

export { tasksSaga };