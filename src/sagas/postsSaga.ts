import { takeEvery } from 'redux-saga/effects';
import { getAsyncAction, ASYNC_POSTS, getDetailAsyncAction, ASYNC_POSTS_DETAIL } from '../modules/posts';
import createAsyncSaga from '../core/utils/reduxUtil';
import axios from 'axios';

const postsListDefaultApi = async () => {
    const res = await axios({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
    });
    return res.data;
};

const postsListDetailApi = async (payload: any) => {
    const res = await axios({
        url: `https://jsonplaceholder.typicode.com/posts/${payload}`,
        method: 'GET',
    });
    return res.data;
};

const postsListsDefault = createAsyncSaga(getAsyncAction, postsListDefaultApi);
const postsListsDetail = createAsyncSaga(getDetailAsyncAction, postsListDetailApi);

export function* watchPostsSaga() {
    yield takeEvery(ASYNC_POSTS.REQUEST, postsListsDefault);
    yield takeEvery(ASYNC_POSTS_DETAIL.REQUEST, postsListsDetail);
}
