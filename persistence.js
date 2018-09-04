const moment = require('moment');
const mongoose = require('mongoose');

const Configuration = require('./config.js');

const tournamentSchema = new mongoose.Schema({
	_id: Number,
	date: Date,
	name: String,
	format: String,
	url: String,
	externalId: String
});

const deckSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	player: String,
	position: String,
	url: String,
	tournamentId: Number,
	mainboard: [{
		_id: String,
		quantity: Number
	}],
	sideboard: [{
		_id: String,
		quantity: Number
	}]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
const Deck = mongoose.model('Deck', deckSchema);

const persistTournament = async function(tournament) {
	console.log('persisting tournament..', tournament.id);
	let t = new Tournament({
		_id: parseInt(tournament.id),
		url: tournament.url,
		format: tournament.format,
		name: tournament.name,
		date: moment(tournament.date, Configuration.mtggoldfish.tournamentDateFormat).utc().startOf('day')
	});
	return await Tournament.replaceOne({_id: t._id}, t, {upsert: true});
}

const persistDeck = async function(deck) {
	console.log('persisting deck..', deck.id);
	let d = new Deck({
		_id: parseInt(deck.id),
		name: deck.name,
		player: deck.player,
		position: deck.position,
		url: deck.url,
		tournamentId: deck.tournamentId,
		mainboard: deck.mainboard.map(card => {
			let c = { _id: card.name, quantity: parseInt(card.quantity) };
			return c;
		}),
		sideboard: deck.sideboard.map(card => {
			let c = { _id: card.name, quantity: parseInt(card.quantity) };
			return c;
		})
	});
	return await Deck.replaceOne({_id: d._id}, d, {upsert: true});
}

module.exports = {
    mongoose: mongoose,
    model: {
        Deck: Deck,
        Tournament: Tournament,
    },
	persistTournament: persistTournament,
	persistDeck: persistDeck,
};