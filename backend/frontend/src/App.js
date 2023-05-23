import './App.css';
import UserSearchPage from './components/UserSearchPage';
import UserDetailsPage from './components/UserDetailsPage';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<UserSearchPage />} />
                    <Route path="/user-details/:loginName" element={<UserDetailsPage />} />
                </Routes>
            </BrowserRouter>
            </header>
        </div>
    );
}

export default App;
