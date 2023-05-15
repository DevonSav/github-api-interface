const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


app.get('/user-search', (request, response) => {
	// For use like /user-search?name=DevonSav
	let searchTerm = request.query.name
	console.log('User search query: ' + searchTerm);

	// Prevent bad searches
	if (searchTerm == "" || searchTerm == null) {
		// Early return
		const errorMessage = `Error! Invalid search term "${searchTerm}".`;
		response.send({errMsg: errorMessage});
		return;
	}

	const url = `https://api.github.com/users/${searchTerm}`;
	const options = {
		method: 'GET'
	};

	fetch(url, options)
		.then(res => res.json())
		.then((resp) => {
				console.log(resp);
				// Create a new json object with only the essentials
				const userShortData = {
					"id": resp.id,
					"name": resp.name,
					"login": resp.login,
					"avatar_url": resp.avatar_url
				}

				response.send(userShortData);
			},
			(error) => {
				response.send({errMsg: error});
				return;
			}
		)
});




app.listen(PORT, ()=>console.log('Listening engaged on ' + PORT));

/** REFERENCES
 * https://rapidapi.com/guides/call-apis-in-express-via-node-fetch
 *
 *
*/
