import { createAsyncAction, AsyncActionCreatorBuilder } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';

type TAsyncAction = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
};

// 액션 생성
export const asyncActionCreator = (actionName: string): TAsyncAction => {
    const asyncTypeAction: string[] = ['_REQUEST', '_SUCCESS', '_FAILURE'];
    return {
        REQUEST: actionName + asyncTypeAction[0],
        SUCCESS: actionName + asyncTypeAction[1],
        FAILURE: actionName + asyncTypeAction[2],
    };
};

// 액션 함수 생성
export const asyncAction = <T, P, J>(asyncAction: TAsyncAction) => {
    return createAsyncAction(asyncAction.REQUEST, asyncAction.SUCCESS, asyncAction.FAILURE)<T, P, J>();
};

// payload 가 있는 경우와 없는 경우 둘다 처리하기 위한 타입.
type TPromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

export default function createAsyncSaga<RequestType, RequestPayload, SuccessType, SuccessPayload, FailureType, FailurePayload>(
    asyncAction: AsyncActionCreatorBuilder<[RequestType, [RequestPayload, undefined]], [SuccessType, [SuccessPayload, undefined]], [FailureType, [FailurePayload, undefined]]>,
    asyncFunction: TPromiseCreatorFunction<RequestPayload, SuccessPayload>,
    successFunc?: any,
    failureFunc?: any
) {
    return function* saga(action: ReturnType<typeof asyncAction.request>) {
        try {
            // api 호출 이때 파라미터는 request()에서 받은 값으로 전달
            const result = yield call(asyncFunction, (action as any).payload);

            // success  액션함수를 dispatch 하여 api결과값 반환
            yield put(asyncAction.success(result));

            if (successFunc) {
                // 성공 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
                yield call(successFunc, '성공');
            }
        } catch (e) {
            // failure  액션함수를 dispatch 하여 error 반환
            yield put(asyncAction.failure(e));

            if (failureFunc) {
                // 실패 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
                yield call(successFunc, e);
            }
        }
    };
}
