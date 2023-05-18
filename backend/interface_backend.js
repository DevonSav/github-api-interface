const express = require('express');
const helmet = require("helmet");
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3001;
const GITHUB_API_TOKEN = process.env.API_TOKEN;


app.use(express.json());
app.use(helmet());
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


/**
 * Finds user matching the provided name.
 */
app.get('/user-search', (request, response) => {
	// For use like /user-search?name=DevonSav
	const userName = request.query.name

	// Prevent bad searches
	if (userName == "" || userName == null) {
		// Early return
		const errorMessage = `Error! Invalid search term "${userName}".`;
		response.send({errMsg: errorMessage});
		return;
	}

	const url = `https://api.github.com/users/${userName}`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `token ${GITHUB_API_TOKEN}`
		}
	};

	try {
		fetch(url, options)
		.then(res => res.json())
		.then((resp) => {
				// Create a new json object with only the essentials
				const userShortData = {
					"id": resp.id,
					"name": resp.name,
					"login": resp.login,
					"avatar_url": resp.avatar_url,
					"bio": resp.bio
				}
				response.send(userShortData);
			},
			(error) => {
				console.log(error);
				//response.send({errMsg: error});
				return;
			}
		)
	} catch (error) {
		console.log('user-search: Github API request denied!');
		console.log(error);
	}
});

/**
 * Finds all repos for a certain user.
 */
app.get('/repo-search', (request, response) => {
	// For use like /repo-search?name=DevonSav
	const userName = request.query.name;
	const repoCount = 15;

	// Prevent bad searches
	if (userName == "" || userName == null) {
		// Early return
		const errorMessage = `Error! Invalid search term "${userName}".`;
		response.send({errMsg: errorMessage});
		return;
	}

	const url = `https://api.github.com/users/${userName}/repos?per_page=${repoCount}?page=1`;	// TODO:FIXME:
	const options = {
		method: 'GET',
		headers: {
			Authorization: `token ${GITHUB_API_TOKEN}`
		}
	};

	try {
		fetch(url, options)
		.then(res => res.json())
		.then(res => {
				let newShortRepoArray = []
				res.forEach(repo => {
					// Create a new json object with only the essentials
					const repoShortData = {
						"id": repo.id,
						"name": repo.name,
						"html_url": repo.html_url,
						"description": repo.description,
						"created_at": repo.created_at,
						"updated_at": repo.updated_at,
					}
					newShortRepoArray.push(repoShortData);
				});
				response.send(newShortRepoArray);
			},
			(error) => {
				console.log(error);
				//response.send({errMsg: error});
				return;
			}
		)
	} catch (error) {
		console.log('repo-search: Github API request denied!');
		console.log(error);
	}
});


/**
 * Finds all commits to a certain repo.
 */
app.get('/commit-search', (request, response) => {
	// For use like /commit-search?name=DevonSav?repo=car-manager
	const owner = request.query.name;
	const repoName = request.query.repo;
	const commitCount = 5;

	console.log('backend commit-search: ', owner, ' ', repoName)

	// Prevent bad searches
	if (owner == "" || owner == null || repoName == "" || repoName == null) {
		// Early return
		const errorMessage = `Error! At least one invalid search term "${owner}" & "${repoName}".`;
		response.send({errMsg: errorMessage});
		return;
	}

	///repos/{owner}/{repo}/commits
	const url = `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=${commitCount}&page=1`;	// TODO:FIXME:
	const options = {
		method: 'GET',
		headers: {
			Authorization: `token ${GITHUB_API_TOKEN}`
		}
	};

	try {
		fetch(url, options)
		.then(res => res.json())
		.then(res => {
				let newShortCommitArray = []
				res.forEach(commit => {
					// Create a new json object with only the essentials
					const msgTitle = (commit.commit.message.split('\n\n')[0] ? commit.commit.message.split('\n\n')[0] : commit.message);
					const msgContents = (commit.commit.message.split('\n\n')[1] ? commit.commit.message.split('\n\n')[1] : '');

					const commitShortData = {
						"sha": commit.sha,
						"message": commit.commit.message,
						"message-title": msgTitle,
						"message-contents": msgContents
					}
					newShortCommitArray.push(commitShortData);
				});
				response.send(newShortCommitArray);
			},
			(error) => {
				console.log(error);
				//response.send({errMsg: error});
				return;
			}
		)
	} catch (error) {
		console.log('commit-search: Github API request denied!');
		console.log(error);
	}
});




app.listen(PORT, ()=>console.log('Listening engaged on port ' + PORT));

/** REFERENCES
 * https://rapidapi.com/guides/call-apis-in-express-via-node-fetch
 * https://stackoverflow.com/questions/8713596/how-to-retrieve-the-list-of-all-github-repositories-of-a-person
 * https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28
 * https://stackoverflow.com/questions/48605484/environment-variables-env-in-node-js-express
*/
