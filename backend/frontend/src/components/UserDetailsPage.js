import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

import logo from '../logo.svg';
import { Link, useParams } from "react-router-dom";


/**
 * Displays user details.
 * @param {*} params name
 */
const UserDetailsComponent = () => {
	const {loginName} = useParams();
	const profileDiv = (
		<div className="github_interface">
				<h1 id="main_heading">User Details</h1>
				<div className='user_profile'>
					<img className="profile_image" alt="profile" src={logo}/>
					<h3 className='profile_username'>{loginName}</h3>
					<br></br>
					<p className='profile_bio'>Long bio about me and what I do or something</p>
					<Link to='/' className="pagelink">BACK TO SEARCH</Link>
				</div>

				<table className='repo_table'>
					<thead>
						<tr>
							<th className='tableHeader'></th>
							<th className='tableHeader'>Repository</th>
							<th className='tableHeader'>Last commit</th>
						</tr>
					</thead>
					<tbody>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github_link'><a className='external_link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>car-manager</td>
							<td className='repoTableData'>Updated last week</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github_link'><a className='external_link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>car-insurance-app</td>
							<td className='repoTableData'>Updated last week</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github_link'><a className='external_link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>react-dictionary</td>
							<td className='repoTableData'>Updated on Mar 20</td>
						</tr>
						<tr className='repoDataRow'>
							<td className='repoTableData' id='github_link'><a className='external_link' href='https://github.com'><FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61dafb",}}/></a></td>
							<td className='repoTableData'>L1T15-Capstone-Three</td>
							<td className='repoTableData'>Updated on Oct 24, 2022</td>
						</tr>
					</tbody>
				</table>
			</div>
	);

	return profileDiv;
}
export default UserDetailsComponent;

/** REFERENCE
 * https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
 */
