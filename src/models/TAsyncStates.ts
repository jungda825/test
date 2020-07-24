export type TAsyncStates<P> = {
    isLoading: boolean;
    data: null | P[];
    error?: any;
};
