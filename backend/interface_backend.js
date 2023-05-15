const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const BASE_URL = 'https://api.github.com/';
const USERS_URL = 'https://api.github.com/users/';	//https://api.github.com/users/USERNAME


function searchForUsers(name) {
	let url = `${USERS_URL}${name}`;

	fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log(data); // Prints result from `response.json()` in getRequest
		return data;	// for sending to the frontend
	})
	.catch(error => console.error(error))
}

app.post('/user-search', (request, response) => {
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

	response.send(searchForUsers(searchTerm));
});




app.listen(PORT, ()=>console.log('Listening engaged'));

/** REFERENCES
 *
 * FIXME:
 *
*/
