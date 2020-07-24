import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsPage from './pages/PostsPage';

import './styles/App.css';

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path="/postsPage" component={PostsPage} />
            </Switch>
        </div>
    );
};

export default App;
