import React from 'react';

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
					console.log(response);
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
			usersDataList = (<tr><td>Waiting for search...</td></tr>);
		} else {
			//If the name is null use the login value
			usersDataList = (
				<>
					{usersList.map(user => (
						<tr key={user.id} className='userDataRow'>
							<td className='userTableData'><img className="user-profile-image" alt="profile" src={user.avatar_url}/></td>
							<td className='userTableData'>{user.name ? user.name : user.login}</td>
						</tr>
						))
					}
				</>
			);
		}

		return (
			<div className="github-interface">
				<h2 id="main-heading">Github Interface</h2>
				<form>
					<input className='search-data-input' id='nameInput' type="text" placeholder='Name' onChange={e => this.handleChange(e)}/>
					<button id='user-search-btn' className='action-btn' onClick={(e) => this.refreshUsersList(e)}>Search</button>
				</form>

				<br></br>
				<table className='user-table'>
					<thead>
						<tr>
							<th className='tableHeader'></th>
							<th className='tableHeader'>Name</th>
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