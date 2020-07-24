import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TAsyncStates } from '../../models/TAsyncStates';
import { IPosts } from '../../modules/posts';
import { SkeletonList1 } from '../skeleton';
import './index.scss';

interface postsListDefaultProps extends RouteComponentProps {
    postsListDefault: TAsyncStates<IPosts>;
}

function Posts({ match, postsListDefault }: postsListDefaultProps) {
    if (postsListDefault.isLoading) {
        return (
            <div>
                <SkeletonList1 />
                <SkeletonList1 />
                <SkeletonList1 />
                <SkeletonList1 />
            </div>
        );
    }

    return (
        <div className="list-group">
            {postsListDefault.data &&
                postsListDefault.data.map((v, i) => {
                    return (
                        <Link to={`${match.path}/${v.id}`} className="list-group-item" key={v.id}>
                            <div className="d-flex justify-content-between">
                                <h5>{v.title}</h5>
                                <small>Index: {v.id}</small>
                            </div>
                            <p>{v.body}</p>
                            <small>userId: {v.userId}</small>
                        </Link>
                    );
                })}
        </div>
    );
}

export default React.memo(Posts);
