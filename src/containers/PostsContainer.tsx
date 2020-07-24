import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../modules';
import { getAsyncAction, getDetailAsyncAction } from '../modules/posts';
import Posts from '../components/posts';
import PostsDetail from '../components/posts/PostsDetail';

const PostsContainer = ({ match }: RouteComponentProps) => {
    const dispatch = useDispatch();
    const postsListDefault = useSelector((state: RootState) => state.posts.posts);
    const handlePostsListsDefault = useCallback(() => dispatch(getAsyncAction.request('요청')), [dispatch]);

    const postsListDetail = useSelector((state: RootState) => state.posts.detail);
    const handlePostsListsDetail = useCallback((id) => dispatch(getDetailAsyncAction.request(id)), [dispatch]);

    useEffect(() => {
        handlePostsListsDefault();
    }, []);

    return (
        <div id="PostsContainer">
            <Switch>
                <Route exact path={match.url} render={(props) => <Posts {...props} postsListDefault={postsListDefault} />} />
                <Route path={`${match.path}/:id`} render={(props) => <PostsDetail {...props} postsListDetail={postsListDetail} onPostsListsDetail={handlePostsListsDetail} />} />
            </Switch>
        </div>
    );
};

export default PostsContainer;
