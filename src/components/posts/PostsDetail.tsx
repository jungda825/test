import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TAsyncState } from '../../models/TAsyncState';
import { IPosts } from '../../modules/posts';
import { SkeletonList1 } from '../skeleton';

interface MatchParams {
    id: string;
}

interface postsListDetailProps extends RouteComponentProps<MatchParams> {
    postsListDetail: TAsyncState<IPosts>;
    onPostsListsDetail: (id: any) => void;
}

const PostsDetail = ({ match, postsListDetail, onPostsListsDetail }: postsListDetailProps) => {
    const { id } = match.params;

    useEffect(() => {
        onPostsListsDetail(id);
    }, [id]);

    if (postsListDetail.isLoading) {
        return (
            <div>
                <SkeletonList1 />
            </div>
        );
    }

    return (
        <div className="list-group-item">
            <div className="d-flex justify-content-between">
                <h5>{postsListDetail.data && postsListDetail.data.title}</h5>
                <small>Index: {postsListDetail.data && postsListDetail.data.id}</small>
            </div>
            <p>{postsListDetail.data && postsListDetail.data.body}</p>
            <small>userId: {postsListDetail.data && postsListDetail.data.userId}</small>
        </div>
    );
};

export default PostsDetail;
