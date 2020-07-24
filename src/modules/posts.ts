import { createReducer, ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import { TAsyncStates } from '../models/TAsyncStates';
import { TAsyncState } from '../models/TAsyncState';
import { asyncActionCreator, asyncAction } from '../core/utils/reduxUtil';

// Data Model
export interface IPosts {
    id: number;
    userId: number;
    title: string;
    body: string;
}

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/'의 조합으로 구성
const prefix: string = 'posts/';

// 2. 액션에 대해서 정의
export const ASYNC_POSTS = asyncActionCreator(`${prefix}POSTS`);
export const ASYNC_POSTS_DETAIL = asyncActionCreator(`${prefix}POSTS_DETAIL`);

// 3. 액션 생성자 함수에 대해서 정의
export const getAsyncAction = asyncAction<string, IPosts[], string>(ASYNC_POSTS);
export const getDetailAsyncAction = asyncAction<string, IPosts, string>(ASYNC_POSTS_DETAIL);

// 4. 해당 리듀서의 상태 타입을 정의
type TPostsState = {
    posts: TAsyncStates<IPosts>;
    detail: TAsyncState<IPosts>;
};

// 5. 리듀서의 값을 정의
const initialState: TPostsState = {
    posts: {
        isLoading: false,
        data: null,
        error: null,
    },
    detail: {
        isLoading: false,
        data: null,
        error: null,
    },
};

// 6. 리듀서를 정의
const postsReducer = createReducer<TPostsState>(initialState, {
    [ASYNC_POSTS.REQUEST]: (state) =>
        produce(state, (draft) => {
            draft.posts.isLoading = true;
        }),
    [ASYNC_POSTS.SUCCESS]: (state, action: ActionType<typeof getAsyncAction.success>) =>
        produce(state, (draft) => {
            draft.posts.isLoading = false;
            draft.posts.data = action.payload;
        }),
    [ASYNC_POSTS.FAILURE]: (state, action) =>
        produce(state, (draft) => {
            draft.posts.isLoading = false;
            draft.posts.data = initialState.posts.data;
            draft.posts.error = action.payload;
        }),

    [ASYNC_POSTS_DETAIL.REQUEST]: (state) =>
        produce(state, (draft) => {
            draft.detail.isLoading = true;
        }),
    [ASYNC_POSTS_DETAIL.SUCCESS]: (state, action: ActionType<typeof getDetailAsyncAction.success>) =>
        produce(state, (draft) => {
            draft.detail.isLoading = false;
            draft.detail.data = action.payload;
        }),
    [ASYNC_POSTS_DETAIL.FAILURE]: (state, action) =>
        produce(state, (draft) => {
            draft.detail.isLoading = false;
            draft.detail.data = initialState.detail.data;
            draft.detail.error = action.payload;
        }),
});

export default postsReducer;
