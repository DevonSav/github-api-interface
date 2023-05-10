import React from 'react';
import logo from '../logo.svg';

export default class GithubInterfacePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			nameInput: null
		};
		this.handleChange = this.handleChange.bind(this);
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
		return (
			<div className="github-interface">
				<h2 id="main-heading">Github Interface</h2>
				<form>
					<input className='search-data-input' id='nameInput' type="text" placeholder='Name' onChange={e => this.handleChange(e)}/>
					<button id='user-search-btn' className='action-btn' onClick={console.log("Clicked search btn")}>Search</button>
				</form>

				<br></br>
				<button id='refresh-btn' className='action-btn' onClick={console.log("Clicked refresh")}>Refresh List</button>
				<table className='user-table'>
					<thead>
						<tr>
							<th className='tableHeader'></th>
							<th className='tableHeader'>Name</th>
						</tr>
					</thead>
					<tbody>
						<tr className='userDataRow'>
							<td className='userTableData'><img className="user-profile-image" alt="profile" src={logo}/></td>
							<td className='userTableData'>DevonSav</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

/** REFERENCES
 *
 */