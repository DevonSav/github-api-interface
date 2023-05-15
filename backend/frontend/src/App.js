import './App.css';
import UserSearchPage from './components/UserSearchPage';
//import UserDetailsPage from './components/UserDetailsPage';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <UserSearchPage />
                {/*<UserDetailsPage />*/}
            </header>
        </div>
    );
}

export default App;
