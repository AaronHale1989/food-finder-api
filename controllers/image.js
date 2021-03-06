const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '859be558cf2c4cba8a85543abbd6f210'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FOOD_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to get response from api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}