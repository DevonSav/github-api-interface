//import { render, screen } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';
import { BrowserRouter } from "react-router-dom";
import UserSearchPage from '../components/UserSearchPage';
import UserDetailsPage from '../components/UserDetailsPage';

test('renders correctly', () => {
    const tree = renderer
    .create(<App />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});


//test('renders learn react link', () => {
//  render(<App />);
//  const linkElement = screen.getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});
