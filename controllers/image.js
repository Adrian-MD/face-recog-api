const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c85eab03bbac4916bd6f97ab582cc300'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => response.status(400).json('Unable to work with API'))
};


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to update entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}