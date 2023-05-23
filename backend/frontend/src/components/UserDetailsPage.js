import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSpinner } from '@fortawesome/free-solid-svg-icons';

import logo from '../logo.svg';
import { Link, useParams } from "react-router-dom";
const loadingIcon = <FontAwesomeIcon icon={faSpinner} size='lg' style={{color: "#61dafb",}}/>;


export class UserDetailsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			reposList: [],
			commitList: [{message: 'Please Select A Repo'}],
			currentRepoDesc: 'Please Select A Repo',
			userData: {"bio": 'No available user bio.'}
		};
		this.refreshRepoList = this.refreshRepoList.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.setRepoDescription = this.setRepoDescription.bind(this);
	}

	refreshRepoList() {
		fetch(`/repo-search?name=${this.props.name}`)
			.then(res => res.json())
			.then((response) => {
					this.setState({isLoaded: true});

					this.setState({
						reposList: response.sort((a, b) => a.name - b.name)
					});
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

	getUserData() {
		fetch(`/user-search?name=${this.props.name}`)
			.then(res => res.json())
			.then((response) => {
					this.setState({
						userData: response
					});
				},
				(error) => {
					console.log(error.message);
				}
			)
	}


	/**
     * Runs automatically.
     */
    componentDidMount() {
		this.getUserData();
        this.refreshRepoList();
    }

	setRepoDescription(e, repoName) {
		e.preventDefault();

		// While data is being fetched
		this.setState({
			currentRepoDesc: loadingIcon,
			commitList: [{message: loadingIcon}]
		});

		fetch(`/commit-search?name=${this.props.name}&repo=${repoName}`)
			.then(res => res.json())
			.then((response) => {
					this.setState({
						commitList: response
					});
				},
				(error) => {
					console.log('refreshCommitList: ', error.message);
				}
			)

		const repositoryList = this.state.reposList;
		for (let i = 0; i < repositoryList.length; i++) {
			const repo = repositoryList[i];
			if (repo.name == repoName) {
				if (repo.description == null) {
					this.setState({
						currentRepoDesc: (`No description for '${repoName}'`)
					});
				} else {
					this.setState({
						currentRepoDesc: repo.description
					});
				}
			}
		}
		console.log('Set repo description')
	}


	render() {
		const { error, isLoaded, reposList, commitList, currentRepoDesc, userData} = this.state;
		const avatarImage = (userData.avatar_url ? userData.avatar_url : logo);
		const profileBio = (userData.bio ? userData.bio : 'No available user bio.');
		const githubIcon = <FontAwesomeIcon icon={faGithubSquare} size='lg' style={{color: "#61fbdf",}}/>;
		const barIcon = <FontAwesomeIcon icon={faBars} size='lg' style={{color: "#61dafb",}}/>;


		let reposDataList = <h3>ERROR, Something went wrong.</h3>;
		if (error) {
			reposDataList = (<tr><td>Error: {error.message}</td></tr>);
		} else if (!isLoaded) {
			reposDataList = (<tr><td>{loadingIcon} Loading...</td></tr>);
		} else {
			reposDataList = (
				<>
					{reposList.map(repo => (
						<tr key={repo.id} className='repoDataRow'>
							<td className='repo_table_data'><a className='external_link' href={repo.html_url}>{githubIcon} {repo.name}</a></td>
							<td className='repo_table_data'>{repo.updated_at.slice(0, 10)}</td>{/*2023-05-02T13:11:20Z*/}
							<td className='repo_table_data'>{repo.created_at.slice(0, 10)}</td>
							<td className='repo_table_data' id='github_link'><button className='action_btn desc_btn' onClick={(e) => this.setRepoDescription(e, repo.name)}>{barIcon}</button></td>
						</tr>
						))
					}
				</>
			);
		}
		let commitDataList = (
			<>
				{commitList.map(commit => (
						<li key={commit.sha} className='list_data'>{commit.message}</li>
					))
				}
			</>
		);

		let repoDisplaySection = (
			<div className='repo_list_group'>
				<h2 id='no_available_repos'>No publicly available repositories.</h2>
			</div>
		);
		if (reposList.length > 0) {
			repoDisplaySection = (
				<>
				<button className='action_btn repo_search' onClick={(e) => this.refreshRepoList(e)}>Refresh Repo List</button>
				<div className='repo_list_group'>
					<table className='repo_table'>
						<thead>
							<tr>
								<th className='table_header'>Repository</th>
								<th className='table_header'>Last commit</th>
								<th className='table_header'>Created</th>
								<th className='table_header' id='repo_desc_btn'></th>
							</tr>
						</thead>
						<tbody>
							{reposDataList}
						</tbody>
					</table>
					<div className='repo_detail_div'>
						<div className='repo_description'>
							<h3 className='repo_detail_header'>Description</h3>
							<p className='repo_contents'>{currentRepoDesc}</p>
						</div>
						<div className='repo_commits_div'>
							<h3 className='repo_detail_header'>Recent commits</h3>
							<ul className='commit_list'>
								{commitDataList}
							</ul>
						</div>
					</div>
				</div>
				</>
			);
		}


		return (
			<div className="github_interface">
				<Link to='/' className="action_btn home_btn">BACK TO SEARCH</Link>
				<h1 id="main_heading">User Details</h1>
				<div className='user_profile'>
				<a href={`https://github.com/${this.props.name}`}><img className="profile_image" alt="profile" src={avatarImage}/></a>
					<h3 className='profile_username'>{this.props.name}</h3>
					<br></br>
					<p className='profile_bio'>{profileBio}</p>
				</div>

				{repoDisplaySection}

			</div>
		);
	}
}


/**
 * Displays user details.
 * @param {*} params name
 */
const UserDetailsComponent = () => {
	const {loginName} = useParams();
	const profileDiv = (
		<UserDetailsPage name={loginName}/>
	);
	return profileDiv;
}
export default UserDetailsComponent;

/** REFERENCE
 * https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
 */
