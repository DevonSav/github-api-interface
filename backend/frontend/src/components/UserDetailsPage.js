import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

import logo from '../logo.svg';

export default class UserDetailsPage extends React.Component {
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
			<div className="user-details">
				<h1 id="main-heading">User Details</h1>
				<div className='user-profile'>
					<img className="profile-image" alt="profile" src={logo}/>
					<p className='profile-username'>DevonSav</p>
					<p className='profile-bio'>Long bio about me and what I do or something</p>
				</div>

				<table className='repo-table'>
					<thead>
						<tr>
							<th className='tableHeader'></th>
							<th className='tableHeader'>Repository</th>
							<th className='tableHeader'>Last commit</th>
						</tr>
					</thead>
					<tbody>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github-link'><a className='external-link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>car-manager</td>
							<td className='repoTableData'>Updated last week</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github-link'><a className='external-link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>car-insurance-app</td>
							<td className='repoTableData'>Updated last week</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github-link'><a className='external-link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>react-dictionary</td>
							<td className='repoTableData'>Updated on Mar 20</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github-link'><a className='external-link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>L1T15-Capstone-Three</td>
							<td className='repoTableData'>Updated on Oct 24, 2022</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}