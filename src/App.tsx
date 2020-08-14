import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PostsPage from './pages/PostsPage';

import Profile from './components/profile';

const App = () => {
    return (
        <div className="App">
            <div id="test">테스트</div>
            <Profile username="정다한" name="정다" />
            <Switch>
                <Route path="/postsPage" component={PostsPage} />
            </Switch>
        </div>
    );
};

export default App;

// import React from 'react';
// import logo from './logo.svg';

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//                     Learn React1
//                 </a>
//             </header>
//         </div>
//     );
// }

// export default App;
