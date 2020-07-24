import React from 'react';
import { PostsContainer } from '../containers';
import { RouteComponentProps } from 'react-router-dom';

const PostsPage = (props: RouteComponentProps) => {
    return <PostsContainer {...props} />;
};

export default PostsPage;
