const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const GITHUB_API_TOKEN = process.env.API_TOKEN;

app.use(express.json());
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
		Headers: {
			Authorization: GITHUB_API_TOKEN
		}
	};

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
				console.log(error)
				response.send({errMsg: error});
				return;
			}
		)

	const dummyResponse = {
        "login": "DevonSav",
        "id": 111747820,
        "node_id": "U_kgDOBqki7A",
        "avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/DevonSav",
        "html_url": "https://github.com/DevonSav",
        "followers_url": "https://api.github.com/users/DevonSav/followers",
        "following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
        "gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
        "organizations_url": "https://api.github.com/users/DevonSav/orgs",
        "repos_url": "https://api.github.com/users/DevonSav/repos",
        "events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
        "received_events_url": "https://api.github.com/users/DevonSav/received_events",
        "type": "User",
        "site_admin": false,
        "name": null,
        "company": null,
        "blog": "",
        "location": null,
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 10,
        "public_gists": 0,
        "followers": 0,
        "following": 0,
        "created_at": "2022-08-22T11:27:55Z",
        "updated_at": "2023-05-10T12:29:40Z"
    };
	//const userShortData = {
	//	"id": dummyResponse.id,
	//	"name": dummyResponse.name,
	//	"login": dummyResponse.login,
	//	"avatar_url": dummyResponse.avatar_url,
	//	"bio": dummyResponse.bio
	//}
	//response.send(userShortData);

});

/**
 * Finds all repos for a certain user.
 */
app.get('/repo-search', (request, response) => {
	// For use like /user-search?name=DevonSav
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
		Headers: {
			Authorization: GITHUB_API_TOKEN
		}
	};

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
				response.send({errMsg: error});
				return;
			}
		)


	const dummyResponse =
	[
		{
		  "id": 635328484,
		  "node_id": "R_kgDOJd5X5A",
		  "name": "car-insurance-app",
		  "full_name": "DevonSav/car-insurance-app",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/car-insurance-app",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/car-insurance-app",
		  "forks_url": "https://api.github.com/repos/DevonSav/car-insurance-app/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/car-insurance-app/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/car-insurance-app/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/car-insurance-app/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/car-insurance-app/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/car-insurance-app/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/car-insurance-app/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/car-insurance-app/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/car-insurance-app/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/car-insurance-app/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/car-insurance-app/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/car-insurance-app/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/car-insurance-app/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/car-insurance-app/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/car-insurance-app/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/car-insurance-app/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/car-insurance-app/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/car-insurance-app/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/car-insurance-app/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/car-insurance-app/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/car-insurance-app/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/car-insurance-app/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/car-insurance-app/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/car-insurance-app/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/car-insurance-app/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/car-insurance-app/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/car-insurance-app/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/car-insurance-app/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/car-insurance-app/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/car-insurance-app/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/car-insurance-app/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/car-insurance-app/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/car-insurance-app/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/car-insurance-app/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/car-insurance-app/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/car-insurance-app/deployments",
		  "created_at": "2023-05-02T13:11:12Z",
		  "updated_at": "2023-05-02T13:11:20Z",
		  "pushed_at": "2023-05-03T16:45:01Z",
		  "git_url": "git://github.com/DevonSav/car-insurance-app.git",
		  "ssh_url": "git@github.com:DevonSav/car-insurance-app.git",
		  "clone_url": "https://github.com/DevonSav/car-insurance-app.git",
		  "svn_url": "https://github.com/DevonSav/car-insurance-app",
		  "homepage": null,
		  "size": 78,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 627812342,
		  "node_id": "R_kgDOJWun9g",
		  "name": "car-manager",
		  "full_name": "DevonSav/car-manager",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/car-manager",
		  "description": "Basic project to demonstrate the use of React with Express.",
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/car-manager",
		  "forks_url": "https://api.github.com/repos/DevonSav/car-manager/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/car-manager/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/car-manager/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/car-manager/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/car-manager/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/car-manager/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/car-manager/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/car-manager/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/car-manager/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/car-manager/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/car-manager/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/car-manager/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/car-manager/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/car-manager/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/car-manager/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/car-manager/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/car-manager/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/car-manager/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/car-manager/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/car-manager/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/car-manager/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/car-manager/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/car-manager/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/car-manager/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/car-manager/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/car-manager/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/car-manager/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/car-manager/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/car-manager/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/car-manager/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/car-manager/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/car-manager/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/car-manager/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/car-manager/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/car-manager/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/car-manager/deployments",
		  "created_at": "2023-04-14T08:54:45Z",
		  "updated_at": "2023-04-14T08:54:53Z",
		  "pushed_at": "2023-05-03T19:40:19Z",
		  "git_url": "git://github.com/DevonSav/car-manager.git",
		  "ssh_url": "git@github.com:DevonSav/car-manager.git",
		  "clone_url": "https://github.com/DevonSav/car-manager.git",
		  "svn_url": "https://github.com/DevonSav/car-manager",
		  "homepage": null,
		  "size": 491,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 611806050,
		  "node_id": "R_kgDOJHdrYg",
		  "name": "hangman-game",
		  "full_name": "DevonSav/hangman-game",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/hangman-game",
		  "description": "L4T21 for HyperionDev",
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/hangman-game",
		  "forks_url": "https://api.github.com/repos/DevonSav/hangman-game/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/hangman-game/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/hangman-game/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/hangman-game/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/hangman-game/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/hangman-game/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/hangman-game/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/hangman-game/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/hangman-game/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/hangman-game/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/hangman-game/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/hangman-game/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/hangman-game/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/hangman-game/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/hangman-game/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/hangman-game/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/hangman-game/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/hangman-game/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/hangman-game/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/hangman-game/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/hangman-game/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/hangman-game/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/hangman-game/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/hangman-game/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/hangman-game/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/hangman-game/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/hangman-game/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/hangman-game/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/hangman-game/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/hangman-game/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/hangman-game/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/hangman-game/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/hangman-game/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/hangman-game/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/hangman-game/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/hangman-game/deployments",
		  "created_at": "2023-03-09T15:28:14Z",
		  "updated_at": "2023-03-09T15:29:09Z",
		  "pushed_at": "2023-03-09T15:29:06Z",
		  "git_url": "git://github.com/DevonSav/hangman-game.git",
		  "ssh_url": "git@github.com:DevonSav/hangman-game.git",
		  "clone_url": "https://github.com/DevonSav/hangman-game.git",
		  "svn_url": "https://github.com/DevonSav/hangman-game",
		  "homepage": null,
		  "size": 582,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 527955089,
		  "node_id": "R_kgDOH3f0kQ",
		  "name": "hobbyWebpage",
		  "full_name": "DevonSav/hobbyWebpage",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/hobbyWebpage",
		  "description": "Webpage for L1T24",
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/hobbyWebpage",
		  "forks_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/hobbyWebpage/deployments",
		  "created_at": "2022-08-23T11:16:00Z",
		  "updated_at": "2022-08-29T09:10:41Z",
		  "pushed_at": "2022-08-26T13:11:06Z",
		  "git_url": "git://github.com/DevonSav/hobbyWebpage.git",
		  "ssh_url": "git@github.com:DevonSav/hobbyWebpage.git",
		  "clone_url": "https://github.com/DevonSav/hobbyWebpage.git",
		  "svn_url": "https://github.com/DevonSav/hobbyWebpage",
		  "homepage": null,
		  "size": 23624,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "HTML",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": true,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 556634159,
		  "node_id": "R_kgDOIS2QLw",
		  "name": "L1T11-Capstone-Two",
		  "full_name": "DevonSav/L1T11-Capstone-Two",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/L1T11-Capstone-Two",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two",
		  "forks_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/L1T11-Capstone-Two/deployments",
		  "created_at": "2022-10-24T08:10:57Z",
		  "updated_at": "2022-10-24T08:11:05Z",
		  "pushed_at": "2022-10-24T08:11:00Z",
		  "git_url": "git://github.com/DevonSav/L1T11-Capstone-Two.git",
		  "ssh_url": "git@github.com:DevonSav/L1T11-Capstone-Two.git",
		  "clone_url": "https://github.com/DevonSav/L1T11-Capstone-Two.git",
		  "svn_url": "https://github.com/DevonSav/L1T11-Capstone-Two",
		  "homepage": null,
		  "size": 2,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 556637780,
		  "node_id": "R_kgDOIS2eVA",
		  "name": "L1T15-Capstone-Three",
		  "full_name": "DevonSav/L1T15-Capstone-Three",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/L1T15-Capstone-Three",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three",
		  "forks_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/L1T15-Capstone-Three/deployments",
		  "created_at": "2022-10-24T08:19:32Z",
		  "updated_at": "2022-10-24T08:19:44Z",
		  "pushed_at": "2022-10-24T08:19:39Z",
		  "git_url": "git://github.com/DevonSav/L1T15-Capstone-Three.git",
		  "ssh_url": "git@github.com:DevonSav/L1T15-Capstone-Three.git",
		  "clone_url": "https://github.com/DevonSav/L1T15-Capstone-Three.git",
		  "svn_url": "https://github.com/DevonSav/L1T15-Capstone-Three",
		  "homepage": null,
		  "size": 14679,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "HTML",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 556633507,
		  "node_id": "R_kgDOIS2Now",
		  "name": "L1T6-Capstone-One",
		  "full_name": "DevonSav/L1T6-Capstone-One",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/L1T6-Capstone-One",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One",
		  "forks_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/L1T6-Capstone-One/deployments",
		  "created_at": "2022-10-24T08:09:16Z",
		  "updated_at": "2022-10-24T08:09:22Z",
		  "pushed_at": "2022-10-24T09:29:21Z",
		  "git_url": "git://github.com/DevonSav/L1T6-Capstone-One.git",
		  "ssh_url": "git@github.com:DevonSav/L1T6-Capstone-One.git",
		  "clone_url": "https://github.com/DevonSav/L1T6-Capstone-One.git",
		  "svn_url": "https://github.com/DevonSav/L1T6-Capstone-One",
		  "homepage": null,
		  "size": 8,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 555393940,
		  "node_id": "R_kgDOIRqjlA",
		  "name": "L2T11-Capstone-Two",
		  "full_name": "DevonSav/L2T11-Capstone-Two",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/L2T11-Capstone-Two",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two",
		  "forks_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/L2T11-Capstone-Two/deployments",
		  "created_at": "2022-10-21T13:46:37Z",
		  "updated_at": "2022-10-21T13:46:43Z",
		  "pushed_at": "2022-10-21T14:13:26Z",
		  "git_url": "git://github.com/DevonSav/L2T11-Capstone-Two.git",
		  "ssh_url": "git@github.com:DevonSav/L2T11-Capstone-Two.git",
		  "clone_url": "https://github.com/DevonSav/L2T11-Capstone-Two.git",
		  "svn_url": "https://github.com/DevonSav/L2T11-Capstone-Two",
		  "homepage": null,
		  "size": 20,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "Java",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 1,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 1,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 529234965,
		  "node_id": "R_kgDOH4t8FQ",
		  "name": "MyCV",
		  "full_name": "DevonSav/MyCV",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/MyCV",
		  "description": null,
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/MyCV",
		  "forks_url": "https://api.github.com/repos/DevonSav/MyCV/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/MyCV/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/MyCV/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/MyCV/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/MyCV/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/MyCV/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/MyCV/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/MyCV/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/MyCV/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/MyCV/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/MyCV/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/MyCV/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/MyCV/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/MyCV/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/MyCV/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/MyCV/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/MyCV/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/MyCV/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/MyCV/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/MyCV/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/MyCV/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/MyCV/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/MyCV/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/MyCV/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/MyCV/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/MyCV/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/MyCV/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/MyCV/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/MyCV/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/MyCV/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/MyCV/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/MyCV/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/MyCV/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/MyCV/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/MyCV/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/MyCV/deployments",
		  "created_at": "2022-08-26T11:43:05Z",
		  "updated_at": "2022-08-26T11:43:51Z",
		  "pushed_at": "2022-08-29T09:16:29Z",
		  "git_url": "git://github.com/DevonSav/MyCV.git",
		  "ssh_url": "git@github.com:DevonSav/MyCV.git",
		  "clone_url": "https://github.com/DevonSav/MyCV.git",
		  "svn_url": "https://github.com/DevonSav/MyCV",
		  "homepage": null,
		  "size": 455,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "HTML",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": true,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "main"
		},
		{
		  "id": 614389904,
		  "node_id": "R_kgDOJJ7YkA",
		  "name": "react-dictionary",
		  "full_name": "DevonSav/react-dictionary",
		  "private": false,
		  "owner": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
		  },
		  "html_url": "https://github.com/DevonSav/react-dictionary",
		  "description": "L4T23",
		  "fork": false,
		  "url": "https://api.github.com/repos/DevonSav/react-dictionary",
		  "forks_url": "https://api.github.com/repos/DevonSav/react-dictionary/forks",
		  "keys_url": "https://api.github.com/repos/DevonSav/react-dictionary/keys{/key_id}",
		  "collaborators_url": "https://api.github.com/repos/DevonSav/react-dictionary/collaborators{/collaborator}",
		  "teams_url": "https://api.github.com/repos/DevonSav/react-dictionary/teams",
		  "hooks_url": "https://api.github.com/repos/DevonSav/react-dictionary/hooks",
		  "issue_events_url": "https://api.github.com/repos/DevonSav/react-dictionary/issues/events{/number}",
		  "events_url": "https://api.github.com/repos/DevonSav/react-dictionary/events",
		  "assignees_url": "https://api.github.com/repos/DevonSav/react-dictionary/assignees{/user}",
		  "branches_url": "https://api.github.com/repos/DevonSav/react-dictionary/branches{/branch}",
		  "tags_url": "https://api.github.com/repos/DevonSav/react-dictionary/tags",
		  "blobs_url": "https://api.github.com/repos/DevonSav/react-dictionary/git/blobs{/sha}",
		  "git_tags_url": "https://api.github.com/repos/DevonSav/react-dictionary/git/tags{/sha}",
		  "git_refs_url": "https://api.github.com/repos/DevonSav/react-dictionary/git/refs{/sha}",
		  "trees_url": "https://api.github.com/repos/DevonSav/react-dictionary/git/trees{/sha}",
		  "statuses_url": "https://api.github.com/repos/DevonSav/react-dictionary/statuses/{sha}",
		  "languages_url": "https://api.github.com/repos/DevonSav/react-dictionary/languages",
		  "stargazers_url": "https://api.github.com/repos/DevonSav/react-dictionary/stargazers",
		  "contributors_url": "https://api.github.com/repos/DevonSav/react-dictionary/contributors",
		  "subscribers_url": "https://api.github.com/repos/DevonSav/react-dictionary/subscribers",
		  "subscription_url": "https://api.github.com/repos/DevonSav/react-dictionary/subscription",
		  "commits_url": "https://api.github.com/repos/DevonSav/react-dictionary/commits{/sha}",
		  "git_commits_url": "https://api.github.com/repos/DevonSav/react-dictionary/git/commits{/sha}",
		  "comments_url": "https://api.github.com/repos/DevonSav/react-dictionary/comments{/number}",
		  "issue_comment_url": "https://api.github.com/repos/DevonSav/react-dictionary/issues/comments{/number}",
		  "contents_url": "https://api.github.com/repos/DevonSav/react-dictionary/contents/{+path}",
		  "compare_url": "https://api.github.com/repos/DevonSav/react-dictionary/compare/{base}...{head}",
		  "merges_url": "https://api.github.com/repos/DevonSav/react-dictionary/merges",
		  "archive_url": "https://api.github.com/repos/DevonSav/react-dictionary/{archive_format}{/ref}",
		  "downloads_url": "https://api.github.com/repos/DevonSav/react-dictionary/downloads",
		  "issues_url": "https://api.github.com/repos/DevonSav/react-dictionary/issues{/number}",
		  "pulls_url": "https://api.github.com/repos/DevonSav/react-dictionary/pulls{/number}",
		  "milestones_url": "https://api.github.com/repos/DevonSav/react-dictionary/milestones{/number}",
		  "notifications_url": "https://api.github.com/repos/DevonSav/react-dictionary/notifications{?since,all,participating}",
		  "labels_url": "https://api.github.com/repos/DevonSav/react-dictionary/labels{/name}",
		  "releases_url": "https://api.github.com/repos/DevonSav/react-dictionary/releases{/id}",
		  "deployments_url": "https://api.github.com/repos/DevonSav/react-dictionary/deployments",
		  "created_at": "2023-03-15T13:46:09Z",
		  "updated_at": "2023-03-15T13:46:17Z",
		  "pushed_at": "2023-03-20T09:57:52Z",
		  "git_url": "git://github.com/DevonSav/react-dictionary.git",
		  "ssh_url": "git@github.com:DevonSav/react-dictionary.git",
		  "clone_url": "https://github.com/DevonSav/react-dictionary.git",
		  "svn_url": "https://github.com/DevonSav/react-dictionary",
		  "homepage": null,
		  "size": 382,
		  "stargazers_count": 0,
		  "watchers_count": 0,
		  "language": "JavaScript",
		  "has_issues": true,
		  "has_projects": true,
		  "has_downloads": true,
		  "has_wiki": true,
		  "has_pages": false,
		  "has_discussions": false,
		  "forks_count": 0,
		  "mirror_url": null,
		  "archived": false,
		  "disabled": false,
		  "open_issues_count": 0,
		  "license": null,
		  "allow_forking": true,
		  "is_template": false,
		  "web_commit_signoff_required": false,
		  "topics": [

		  ],
		  "visibility": "public",
		  "forks": 0,
		  "open_issues": 0,
		  "watchers": 0,
		  "default_branch": "master"
		}
	];

	//let newShortRepoArray = [];
	//dummyResponse.forEach(repo => {
	//	// Create a new json object with only the essentials
	//	const repoShortData = {
	//		"id": repo.id,
	//		"name": repo.name,
	//		"html_url": repo.html_url,
	//		"description": repo.description,
	//		"created_at": repo.created_at,
	//		"updated_at": repo.updated_at,
	//	}
	//	newShortRepoArray.push(repoShortData);
	//});
	//response.send(newShortRepoArray);
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
		Headers: {
			Authorization: GITHUB_API_TOKEN
		}
	};

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
				response.send({errMsg: error});
				return;
			}
		)



	const dummyResponse =
	[
		{
			"sha": "a94b45c30e903a2f95b0e8928b7a9a5b658081ee",
			"node_id": "C_kwDOJWun9toAKGE5NGI0NWMzMGU5MDNhMmY5NWIwZTg5MjhiN2E5YTViNjU4MDgxZWU",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T19:34:47Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T19:34:47Z"
			},
			"message": "Fixed bad Helmet install.",
			"tree": {
				"sha": "0b171d41758226f0318b2aa32aa9de283137437e",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/0b171d41758226f0318b2aa32aa9de283137437e"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/a94b45c30e903a2f95b0e8928b7a9a5b658081ee",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/a94b45c30e903a2f95b0e8928b7a9a5b658081ee",
			"html_url": "https://github.com/DevonSav/car-manager/commit/a94b45c30e903a2f95b0e8928b7a9a5b658081ee",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/a94b45c30e903a2f95b0e8928b7a9a5b658081ee/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "0edfc60e4e5143041a5c346a75a424394b66761c",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/0edfc60e4e5143041a5c346a75a424394b66761c",
				"html_url": "https://github.com/DevonSav/car-manager/commit/0edfc60e4e5143041a5c346a75a424394b66761c"
			}
			]
		},
		{
			"sha": "0edfc60e4e5143041a5c346a75a424394b66761c",
			"node_id": "C_kwDOJWun9toAKDBlZGZjNjBlNGU1MTQzMDQxYTVjMzQ2YTc1YTQyNDM5NGI2Njc2MWM",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T16:39:45Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T16:39:45Z"
			},
			"message": "Added Helmet.\n\n- Continuation of L4T29; using Google Style guide conventions",
			"tree": {
				"sha": "382f301da6da4d8aa41dfce3f753e80b948db367",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/382f301da6da4d8aa41dfce3f753e80b948db367"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/0edfc60e4e5143041a5c346a75a424394b66761c",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/0edfc60e4e5143041a5c346a75a424394b66761c",
			"html_url": "https://github.com/DevonSav/car-manager/commit/0edfc60e4e5143041a5c346a75a424394b66761c",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/0edfc60e4e5143041a5c346a75a424394b66761c/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "076376af182956a44469911784714cba26bb2192",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/076376af182956a44469911784714cba26bb2192",
				"html_url": "https://github.com/DevonSav/car-manager/commit/076376af182956a44469911784714cba26bb2192"
			}
			]
		},
		{
			"sha": "076376af182956a44469911784714cba26bb2192",
			"node_id": "C_kwDOJWun9toAKDA3NjM3NmFmMTgyOTU2YTQ0NDY5OTExNzg0NzE0Y2JhMjZiYjIxOTI",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T16:31:43Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "111747820+DevonSav@users.noreply.github.com",
				"date": "2023-05-03T16:31:43Z"
			},
			"message": "Formatting refactor.\n\n- Updates to conform to the Google Style guide",
			"tree": {
				"sha": "15e2d654e2c7d706b134dcb9fd3ae05344d658bf",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/15e2d654e2c7d706b134dcb9fd3ae05344d658bf"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/076376af182956a44469911784714cba26bb2192",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/076376af182956a44469911784714cba26bb2192",
			"html_url": "https://github.com/DevonSav/car-manager/commit/076376af182956a44469911784714cba26bb2192",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/076376af182956a44469911784714cba26bb2192/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "eb3082d3db713497091780cf2c83f4f12a6f35d0",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb3082d3db713497091780cf2c83f4f12a6f35d0",
				"html_url": "https://github.com/DevonSav/car-manager/commit/eb3082d3db713497091780cf2c83f4f12a6f35d0"
			}
			]
		},
		{
			"sha": "eb3082d3db713497091780cf2c83f4f12a6f35d0",
			"node_id": "C_kwDOJWun9toAKGViMzA4MmQzZGI3MTM0OTcwOTE3ODBjZjJjODNmNGYxMmE2ZjM1ZDA",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-21T15:34:20Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-21T15:34:20Z"
			},
			"message": "Update README.md",
			"tree": {
				"sha": "d69978c1929222f1838708938bf247a55831ee96",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/d69978c1929222f1838708938bf247a55831ee96"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/eb3082d3db713497091780cf2c83f4f12a6f35d0",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb3082d3db713497091780cf2c83f4f12a6f35d0",
			"html_url": "https://github.com/DevonSav/car-manager/commit/eb3082d3db713497091780cf2c83f4f12a6f35d0",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb3082d3db713497091780cf2c83f4f12a6f35d0/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
				"html_url": "https://github.com/DevonSav/car-manager/commit/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee"
			}
			]
		},
		{
			"sha": "82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
			"node_id": "C_kwDOJWun9toAKDgyZTA5YWIxMzJiZWZlZDdjNmY4YTJjZTBiYzdkMjdkYWE4ZDNjZWU",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:44:28Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:44:28Z"
			},
			"message": "Cleanup.",
			"tree": {
				"sha": "73d86ebecc9f2c21971fded0ef4a6a41a23a8581",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/73d86ebecc9f2c21971fded0ef4a6a41a23a8581"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
			"html_url": "https://github.com/DevonSav/car-manager/commit/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/82e09ab132befed7c6f8a2ce0bc7d27daa8d3cee/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
				"html_url": "https://github.com/DevonSav/car-manager/commit/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25"
			}
			]
		},
		{
			"sha": "eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
			"node_id": "C_kwDOJWun9toAKGViNTNhM2EzZjU2MjcyODk5ZDUwNTFjZGI5YTdkYWU4N2Q4ZmJmMjU",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:06:39Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:06:39Z"
			},
			"message": "Update README.md",
			"tree": {
				"sha": "74b9b38c5315c3ec13fe9dbb01bc5efdeaa236ad",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/74b9b38c5315c3ec13fe9dbb01bc5efdeaa236ad"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
			"html_url": "https://github.com/DevonSav/car-manager/commit/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/eb53a3a3f56272899d5051cdb9a7dae87d8fbf25/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
				"html_url": "https://github.com/DevonSav/car-manager/commit/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2"
			}
			]
		},
		{
			"sha": "8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
			"node_id": "C_kwDOJWun9toAKDhjYTgxOTUzNGU5ZWI5ZGQ1MGUxYjFiYTBmNGI3N2MwZDQ3NWFhYzI",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:01:25Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T20:01:25Z"
			},
			"message": "Updated car delete method.\n\n- Backend changes to make DELETE method work more like the PUT and POST methods by taking JSON data.\n- Added more comments.",
			"tree": {
				"sha": "6c0b1289720e2ec91610aa273c8632d2b35aefaa",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/6c0b1289720e2ec91610aa273c8632d2b35aefaa"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
			"html_url": "https://github.com/DevonSav/car-manager/commit/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/8ca819534e9eb9dd50e1b1ba0f4b77c0d475aac2/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "851c709687f1ee148f1351630ac686eca4c4da10",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/851c709687f1ee148f1351630ac686eca4c4da10",
				"html_url": "https://github.com/DevonSav/car-manager/commit/851c709687f1ee148f1351630ac686eca4c4da10"
			}
			]
		},
		{
			"sha": "851c709687f1ee148f1351630ac686eca4c4da10",
			"node_id": "C_kwDOJWun9toAKDg1MWM3MDk2ODdmMWVlMTQ4ZjEzNTE2MzBhYzY4NmVjYTRjNGRhMTA",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T19:42:01Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T19:42:01Z"
			},
			"message": "Adding and updating car function added.",
			"tree": {
				"sha": "e698ea8e503a5edeb647b53e6205e10d70389d1b",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/e698ea8e503a5edeb647b53e6205e10d70389d1b"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/851c709687f1ee148f1351630ac686eca4c4da10",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/851c709687f1ee148f1351630ac686eca4c4da10",
			"html_url": "https://github.com/DevonSav/car-manager/commit/851c709687f1ee148f1351630ac686eca4c4da10",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/851c709687f1ee148f1351630ac686eca4c4da10/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "8174b2a904f3edf68c18643c3c85f5460fefb8ef",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/8174b2a904f3edf68c18643c3c85f5460fefb8ef",
				"html_url": "https://github.com/DevonSav/car-manager/commit/8174b2a904f3edf68c18643c3c85f5460fefb8ef"
			}
			]
		},
		{
			"sha": "8174b2a904f3edf68c18643c3c85f5460fefb8ef",
			"node_id": "C_kwDOJWun9toAKDgxNzRiMmE5MDRmM2VkZjY4YzE4NjQzYzNjODVmNTQ2MGZlZmI4ZWY",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T19:13:13Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T19:13:13Z"
			},
			"message": "Update CarManagerPage.js",
			"tree": {
				"sha": "30a3d47607771a1dd69fbfa01bacbc93e1bb99b2",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/30a3d47607771a1dd69fbfa01bacbc93e1bb99b2"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/8174b2a904f3edf68c18643c3c85f5460fefb8ef",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/8174b2a904f3edf68c18643c3c85f5460fefb8ef",
			"html_url": "https://github.com/DevonSav/car-manager/commit/8174b2a904f3edf68c18643c3c85f5460fefb8ef",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/8174b2a904f3edf68c18643c3c85f5460fefb8ef/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
				"html_url": "https://github.com/DevonSav/car-manager/commit/654590a6a92bb04d632869fe503bb5eb8e4d4b8b"
			}
			]
		},
		{
			"sha": "654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
			"node_id": "C_kwDOJWun9toAKDY1NDU5MGE2YTkyYmIwNGQ2MzI4NjlmZTUwM2JiNWViOGU0ZDRiOGI",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T16:06:13Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T16:06:13Z"
			},
			"message": "Added state to track input.",
			"tree": {
				"sha": "0195a2554ad4941e095af0a55654582dd3ed1736",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/0195a2554ad4941e095af0a55654582dd3ed1736"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
			"html_url": "https://github.com/DevonSav/car-manager/commit/654590a6a92bb04d632869fe503bb5eb8e4d4b8b",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/654590a6a92bb04d632869fe503bb5eb8e4d4b8b/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "f00d5a87cf8c55bca540d809191f833096667d78",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/f00d5a87cf8c55bca540d809191f833096667d78",
				"html_url": "https://github.com/DevonSav/car-manager/commit/f00d5a87cf8c55bca540d809191f833096667d78"
			}
			]
		},
		{
			"sha": "f00d5a87cf8c55bca540d809191f833096667d78",
			"node_id": "C_kwDOJWun9toAKGYwMGQ1YTg3Y2Y4YzU1YmNhNTQwZDgwOTE5MWY4MzMwOTY2NjdkNzg",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T11:35:16Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-18T11:35:16Z"
			},
			"message": "Start adding method to post car data.",
			"tree": {
				"sha": "73fbca6a4aa341c0684a9572e1b99442c1e3bcd4",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/73fbca6a4aa341c0684a9572e1b99442c1e3bcd4"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/f00d5a87cf8c55bca540d809191f833096667d78",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/f00d5a87cf8c55bca540d809191f833096667d78",
			"html_url": "https://github.com/DevonSav/car-manager/commit/f00d5a87cf8c55bca540d809191f833096667d78",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/f00d5a87cf8c55bca540d809191f833096667d78/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "fada33d182984cfe6c6d6b92bf080b628c254bf4",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/fada33d182984cfe6c6d6b92bf080b628c254bf4",
				"html_url": "https://github.com/DevonSav/car-manager/commit/fada33d182984cfe6c6d6b92bf080b628c254bf4"
			}
			]
		},
		{
			"sha": "fada33d182984cfe6c6d6b92bf080b628c254bf4",
			"node_id": "C_kwDOJWun9toAKGZhZGEzM2QxODI5ODRjZmU2YzZkNmI5MmJmMDgwYjYyOGMyNTRiZjQ",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-14T08:53:23Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-14T08:53:23Z"
			},
			"message": "First commit.",
			"tree": {
				"sha": "9a1ea882e8681ba2b0d5eaad7f1a849f01dcb455",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/9a1ea882e8681ba2b0d5eaad7f1a849f01dcb455"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/fada33d182984cfe6c6d6b92bf080b628c254bf4",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/fada33d182984cfe6c6d6b92bf080b628c254bf4",
			"html_url": "https://github.com/DevonSav/car-manager/commit/fada33d182984cfe6c6d6b92bf080b628c254bf4",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/fada33d182984cfe6c6d6b92bf080b628c254bf4/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [
			{
				"sha": "e106d321cb4d20cb3a9141661997bc5eb6e70503",
				"url": "https://api.github.com/repos/DevonSav/car-manager/commits/e106d321cb4d20cb3a9141661997bc5eb6e70503",
				"html_url": "https://github.com/DevonSav/car-manager/commit/e106d321cb4d20cb3a9141661997bc5eb6e70503"
			}
			]
		},
		{
			"sha": "e106d321cb4d20cb3a9141661997bc5eb6e70503",
			"node_id": "C_kwDOJWun9toAKGUxMDZkMzIxY2I0ZDIwY2IzYTkxNDE2NjE5OTdiYzVlYjZlNzA1MDM",
			"commit": {
			"author": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-14T08:46:19Z"
			},
			"committer": {
				"name": "DevonSav",
				"email": "devon.tsaville@gmail.com",
				"date": "2023-04-14T08:46:19Z"
			},
			"message": "Initial commit",
			"tree": {
				"sha": "47447a56718322ad017a08774ac39910d18166c1",
				"url": "https://api.github.com/repos/DevonSav/car-manager/git/trees/47447a56718322ad017a08774ac39910d18166c1"
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/git/commits/e106d321cb4d20cb3a9141661997bc5eb6e70503",
			"comment_count": 0,
			"verification": {
				"verified": false,
				"reason": "unsigned",
				"signature": null,
				"payload": null
			}
			},
			"url": "https://api.github.com/repos/DevonSav/car-manager/commits/e106d321cb4d20cb3a9141661997bc5eb6e70503",
			"html_url": "https://github.com/DevonSav/car-manager/commit/e106d321cb4d20cb3a9141661997bc5eb6e70503",
			"comments_url": "https://api.github.com/repos/DevonSav/car-manager/commits/e106d321cb4d20cb3a9141661997bc5eb6e70503/comments",
			"author": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"committer": {
			"login": "DevonSav",
			"id": 111747820,
			"node_id": "U_kgDOBqki7A",
			"avatar_url": "https://avatars.githubusercontent.com/u/111747820?v=4",
			"gravatar_id": "",
			"url": "https://api.github.com/users/DevonSav",
			"html_url": "https://github.com/DevonSav",
			"followers_url": "https://api.github.com/users/DevonSav/followers",
			"following_url": "https://api.github.com/users/DevonSav/following{/other_user}",
			"gists_url": "https://api.github.com/users/DevonSav/gists{/gist_id}",
			"starred_url": "https://api.github.com/users/DevonSav/starred{/owner}{/repo}",
			"subscriptions_url": "https://api.github.com/users/DevonSav/subscriptions",
			"organizations_url": "https://api.github.com/users/DevonSav/orgs",
			"repos_url": "https://api.github.com/users/DevonSav/repos",
			"events_url": "https://api.github.com/users/DevonSav/events{/privacy}",
			"received_events_url": "https://api.github.com/users/DevonSav/received_events",
			"type": "User",
			"site_admin": false
			},
			"parents": [

			]
		}
	];


//	let newShortCommitArray = [];
//	dummyResponse.forEach(commit => {
//		// Create a new json object with only the essentials
//		const msgTitle = (commit.commit.message.split('\n\n')[0] ? commit.commit.message.split('\n\n')[0] : commit.message);
//		const msgContents = (commit.commit.message.split('\n\n')[1] ? commit.commit.message.split('\n\n')[1] : '');
//
//		const commitShortData = {
//			"sha": commit.sha,
//			"message": commit.commit.message,
//			"message-title": msgTitle,
//			"message-contents": msgContents
//		}
//		console.log('backend: ', commitShortData)
//		newShortCommitArray.push(commitShortData);
//	});
//	response.send(newShortCommitArray);
});




app.listen(PORT, ()=>console.log('Listening engaged on port ' + PORT));

/** REFERENCES
 * https://rapidapi.com/guides/call-apis-in-express-via-node-fetch
 * https://stackoverflow.com/questions/8713596/how-to-retrieve-the-list-of-all-github-repositories-of-a-person
 *
 *
 *
 *
*/
