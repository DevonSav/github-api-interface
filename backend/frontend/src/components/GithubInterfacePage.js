import React from 'react';
import logo from '../logo.svg';


async function getUsers(names) {
	console.log(names);
	let jobs = [];

	for(let name of names) {
		let job = fetch(`https://api.github.com/users/${name}`).then(
			successResponse => {
				if (successResponse.status != 200) {
					return null;
				} else {
					return successResponse.json();
				}
			},
			failResponse => {
				return null;
			}
		);
		jobs.push(job);
	}

	let results = await Promise.all(jobs);

	//console.log(results);
	return results;
}

export default class GithubInterfacePage extends React.Component {
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

//		let resp = getUsers([this.state.nameInput, "iliakan"]);
//		console.log(resp);
//		console.log(resp.results);
//
//		let newUsersList = [resp[0], resp[1]];
//		console.log(newUsersList);
//
//		this.setState({
//			isLoaded: true,
//			usersList: [resp]
//		});


		let names = [this.state.nameInput, "DevdudeX"];
		let newNList = [];
		for(let name of names) {
			let url = `https://api.github.com/users/${name}`;
			fetch(url)
				.then(res => res.json())
				.then((response) => {
						console.log(response);
						newNList.push(response);
						let hasName = response.name ? true : false;

						if (hasName) {
							this.setState({
								isLoaded: true,
								usersList: newNList.sort((a, b) => a.name - b.name)
							});
						} else {
							this.setState({
								isLoaded: true,
								usersList: newNList.sort((a, b) => a.login - b.login)
							});
						}
					},
					(error) => {
						console.log(error.message);
						this.setState({
							isLoaded: true,
							error
						});
					}
				)
		}




//		let url = `/user-search?name=${this.state.nameInput}`;
//		fetch(url)
//			.then(res => res.json())
//			.then((response) => {
//					console.log(response);
//
//					this.setState({
//						isLoaded: true,
//						usersList: response.sort((a, b) => a.name - b.name)
//					});
//				},
//				(error) => {
//					console.log(error.message);
//					this.setState({
//						isLoaded: true,
//						error
//					});
//				}
//			)
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
			usersDataList = (
				<>
				<tr className='userDataRow'>
					<td className='userTableData'><img className="user-profile-image" alt="profile" src={logo}/></td>
					<td className='userTableData'>EXAMPLE NAME</td>
				</tr>
				<tr><td></td><td>Waiting for search...</td></tr>
				</>
			);
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
					<button id='user-search-btn' className='action-btn' onClick={e => this.refreshUsersList(e)}>Search</button>
				</form>

				<br></br>
				{/*<button id='refresh-btn' className='action-btn' onClick={console.log("Clicked refresh")}>Refresh List</button>*/}
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