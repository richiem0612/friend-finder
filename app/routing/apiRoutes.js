var friends = require("../data/friends.js");

module.exports = function (app) {

	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function (req, res) {

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000 
		};

		console.log(req.body);
		// Here we take the result of the users survey POST and parse it 
		var userData = req.body;
		var userScores = userData.scores;

		console.log(userScores);
		
		// This variable will calculate the difference between the users score and the scores of each user in the database 
		var totalDifference = 0;

		// loop through all the friends possibilites in the database 
		for (var i = 0; i < friends.length; i++) {

			console.log(friends[i]);
			totalDifference = 0;

			// loop through all the scores of each friend
			for (var j = 0; j < friends[i].scores[j]; j++) {

				// calc the difference between the scores and sum them into the totalDifference varable 
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// if the sum of the difference is less then the differnces of the current best match
				if (totalDifference <= bestMatch.friendDifference) {

					// reset the bestMatch to be the new friend
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		//finally save the users data into the database (this has to happen after the check otherwise the database
		// will always return that the user is the users best friend)
		friends.push(userData);

		// return a json with the users bestmatch this will be used in the html in the next page
		res.json(bestMatch);
	});
}