import { all, call, put, takeEvery, select } from 'redux-saga/effects';
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

function* createTask({payload}) {
    try {
        const { points: point_value, dueDate: due_date, ...rest } = payload;
        const postParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                point_value, due_date, ...rest
            }),
        }
        const results = yield call(fetch, '/api/v1/tasks/', postParams);
        if (results.status === 201) {
            const current = yield select((state) => state.tasks.tasks);
            yield put(fetchSuccess({
                results: [yield results.json(), ...current]
            }));
        } else {
            yield put(fetchFailed());
        }
    } catch (e) {
        // TODO
    }
}

function* tasksSaga() {
    yield all([
        takeEvery(FETCH_TASKS, fetchTasks),
        takeEvery(CREATE_TASK, createTask),
    ]);
}

export { tasksSaga };