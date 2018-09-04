const Persistence = require('./persistence.js');
const Configuration = require('./config.js');
const Services = require('./services.js');
const moment = require('moment');

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

const getTournaments = async function(dateStart, dateEnd, format) {
	let tournaments = await Services.getTournaments(dateStart, dateEnd, format)
	.then(tournaments => tournaments.filter(tournament => tournament['format'] === 'modern' || tournament['format'] === 'mixed'))
	.then(tournaments => tournaments.filter(tournament => Configuration.tournamentTypes.some(tournamentType => tournament.name.match(tournamentType.regex))))
	.then(tournaments => 
		Promise.all(tournaments.map(Persistence.persistTournament))
	);
}

const getDecks = async function(tournamentId, dateStart) {
	let query = {};
	if(tournamentId) {
		query._id = tournamentId
	} else if(dateStart) {
		query.date = {
			$gte: moment(dateStart, 'YYYY-MM-DD')
		}
	}

	let tournaments = await Persistence.model.Tournament.find(query)
	.then(async function(tournaments) {
			let allDecks = [];
			for(var i = 0; i < tournaments.length; i++) {
				let tournament = tournaments[i];
				let decks = await Services.getDecksForTournament(tournament._id);
				await Promise.all(decks.map(Persistence.persistDeck));
				allDecks.concat(decks);
			}
			return allDecks;
		}
	);
}

const run = async function() {

	// await getTournaments('2018-08-01', '2018-08-31', 'modern');
	await getDecks(null, '2018-08-01');

	return;
};

run()
.then(() => {
	console.log('finishing..');
	shutdown();
})
.catch(console.err);