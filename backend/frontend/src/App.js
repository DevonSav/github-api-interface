import './App.css';
import UserSearchPage from './components/UserSearchPage';
import UserDetailsPage from './components/UserDetailsPage';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <Routes>
                <Route exact path="/" element={<UserSearchPage />} />
                <Route path="/user-details/:loginName" element={<UserDetailsPage />} />
            </Routes>
            </header>
        </div>
    );
}

export default App;
