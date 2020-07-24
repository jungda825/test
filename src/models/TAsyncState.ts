export type TAsyncState<P> = {
    isLoading: boolean;
    data: null | P;
    error?: any;
};
