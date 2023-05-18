import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const loadingIcon = <FontAwesomeIcon icon={faSpinner} size='lg' style={{color: "#61dafb",}}/>;

export default class UserSearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			usersList: [],
			nameInput: null
		};
		this.refreshUsersList = this.refreshUsersList.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	refreshUsersList(event) {
		event.preventDefault(); // prevent page refresh
		let newShortUserList = [];

		fetch(`/user-search?name=${this.state.nameInput}`)
			.then(res => res.json())
			.then((response) => {
					newShortUserList.push(response);
					let hasName = response.name ? true : false;
					this.setState({isLoaded: true});

					if (hasName) {
						this.setState({
							usersList: newShortUserList.sort((a, b) => a.name - b.name)
						});
					} else {
						this.setState({
							usersList: newShortUserList.sort((a, b) => a.login - b.login)
						});
					}
				},
				(error) => {
					console.log(error.message);
					this.setState({
						isLoaded: false,
						error
					});
				}
			)
	}

	/**
	 * Gets the input value and sets the corresponding state variable.
	 */
	handleChange(event) {
		const value = event.target.value;
		const inputFieldElementId = event.target.id;
		this.setState({
			[inputFieldElementId]: value
		});
	}

	render() {
		let usersDataList = <h3>ERROR, Something went wrong.</h3>;
		const { error, isLoaded, usersList} = this.state;

		if (error) {
			usersDataList = (<tr><td>Error: {error.message}</td></tr>);
		} else if (!isLoaded) {
			usersDataList = (<tr><td></td><td id='user_search_waiting'>Waiting for search...</td></tr>);
		} else {
			//username: (user.name ? user.name : user.login), login: user.login
			const newTo = {
				pathname: `/user-details/${usersList[0].login}`
			};

			//If the name is null use the login value
			usersDataList = (
				<>
					{usersList.map(user => (
						<tr key={user.id} className='userDataRow'>
							<td className='user_table_data'><a href={`https://github.com/${user.login}`}><img className="user_profile_image" alt="profile" src={user.avatar_url}/></a></td>
							<td className='user_table_data'><Link to={newTo} className="pagelink user_page">{user.name ? user.name : user.login}</Link></td>
						</tr>
						))
					}
				</>
			);
		}

		return (
			<div className="github_interface">
				<h2 id="main_heading">Github Interface</h2>
				<form className='user_search_form'>
					<input className='search_data_input' id='nameInput' type="text" placeholder='Name' onChange={e => this.handleChange(e)}/>
					<button className='action_btn user_search' onClick={(e) => this.refreshUsersList(e)}>Search</button>
				</form>

				<br></br>
				<table className='user_table'>
					<thead>
						<tr>
							<th className='table_header left'>Github</th>
							<th className='table_header'>Name</th>
						</tr>
					</thead>
					<tbody>
						{usersDataList}
					</tbody>
				</table>
			</div>
		);
	}
}

/** REFERENCES
 *
 */