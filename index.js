const Persistence = require('./persistence.js');
const Configuration = require('./config.js');
const Services = require('./services.js');
const moment = require('moment');

require('console.table');
const _ = require('lodash');

// open mongo connection
Persistence.mongoose.connect(Configuration.db.url, { useNewUrlParser: true });
Persistence.mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
Persistence.mongoose.connection.on('connected', function() { console.log('MongoDB connected!'); });
Persistence.mongoose.connection.on('disconnected', function() { console.log('MongoDB disconnected!'); });

const shutdown = function() {
	Persistence.mongoose.connection.close(false, () => {
		console.log('MongoDB connection closed');
	});
}

// This will handle process.exit():
// process.on('exit', shutdown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);
// process.on('SIGKILL', shutdown);

// This will prevent dirty exit on code-fault crashes:
// process.on('uncaughtException', shutdown);
// process.on('unhandledRejection', shutdown);

const findDecks = async function(archetype, tournamentTypes) {
	console.log('searching for decks with criteria:');
	console.log('archetype:\n', archetype);
	if(tournamentTypes && tournamentTypes.length > 0) {
		console.log('tournamentTypes:');
		console.table(tournamentTypes);
	}

	let decksQuery = {};
	let matches = [];
	let tournaments = [];

	if(tournamentTypes && tournamentTypes.length > 0) {
		let tournamentsQuery = {
			$or: tournamentTypes.map(tt => {
				return {
					name: {
						$regex: tt.regex, 
						$options: 'i'
					}
				};
			})
		};
		tournaments = await Persistence.model.Tournament.find(tournamentsQuery, {_id: 1});

		decksQuery = {
			tournamentId: {
				$in: tournaments.map(t => t._id)
			}
		};
	}

	await Persistence.model.Deck.find(decksQuery)
	.then(decks => {
		decks.forEach(deck => {
			let mainboardCards = deck.mainboard.map(d => d._id);
			let matching = _.difference(archetype.includedCards, mainboardCards).length === 0
				&& _.difference(mainboardCards, archetype.excludedCards).length === mainboardCards.length;
			if(matching) {
				matches.push(deck);
			}
		})
	});

	return matches;
}

const printStats = function(decks, board) {
	console.log(board);
	let totalDecks = decks.length;
	let cardCounts = {};

	decks.forEach(deck => {
		deck[board].forEach(card => {
			let count = cardCounts[card._id] || 0;
			cardCounts[card._id] = count+card.quantity;
		});
	});

	let result = [];
	for (var cardName in cardCounts) {
		let decksCount = decks.filter(deck => {return _.some(deck[board], {'_id': cardName}); }).length;
		result.push({
			name: cardName,
			total: cardCounts[cardName],
			decks: decksCount,
			average: Math.round(cardCounts[cardName]/decksCount * 1000) / 1000,
			decksFormatted: decksCount+'/'+totalDecks+' ('+parseInt(decksCount/totalDecks*100)+'%)'
		});
	}

	result = _.orderBy(result, ['decks'], ['desc'])
	result = _.map(result, function(r) { return _.omit(r, ['decks']); });
	console.table(
		result
	);
}

const run = async function() {

	let archetype = Configuration.deckArchetypes.FETCHLESS_STORM
	decks = await findDecks(archetype, [Configuration.tournamentTypes.SCG_OPEN]);
	console.log(archetype.name);
	printStats(decks, 'mainboard');
	printStats(decks, 'sideboard');

	// decks = await findDecks({
	// 	name: 'All',
	// 	format: 'modern',
	// 	includedCards: [],
	// 	excludedCards: [],
	// });
	// console.log('all');
	// printStats(decks, 'mainboard');
	// printStats(decks, 'sideboard');

	return;
};

run()
.then(() => {
	console.log('finishing..');
	shutdown();
})
.catch(console.err);