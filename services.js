const Scraper = require('./scraper.js');
const Configuration = require('./config.js');
const Tools = require('./tools.js');

const getTournaments = async function(dateStart, dateEnd, format) {
	let pageNo = 1;
	let pageTournaments = [];
	let tournaments = [];

	do {
		console.log('fetching tournaments, page '+pageNo+'..');
		let pageHtml = await Scraper.downloadPage(Scraper.buildTournamentSearchUrl(Configuration.mtggoldfish.baseUrl, dateStart, dateEnd, pageNo, format));
		pageTournaments = Scraper.parseTournaments(pageHtml);
		tournaments = tournaments.concat(pageTournaments);

		pageNo += 1;
		await Tools.sleep(100);
	} while(pageTournaments.length > 0);

	console.log('pages parsed: '+pageNo);
	console.log('tournaments fecthed: '+tournaments.length);
	return tournaments;
}

const getDecksForTournament = async function(tournamentId) {
	if(!tournamentId)
		throw "invalid tournamentId: "+tournamentId;
	let pageHtml = await Scraper.downloadPage(Configuration.mtggoldfish.baseUrl+'/tournament/'+tournamentId);
	let decks = Scraper.parseDecks(pageHtml);
	let result = [];
	for(var i = 0; i<decks.length; i++) {
		let deck = decks[i];
		deck.tournamentId = tournamentId;
		let decklist = await getDecklist(deck.id).catch(err => console.log(err+'\n', deck));
		if(decklist) {
			deck.mainboard = decklist.mainboard;
			deck.sideboard = decklist.sideboard;
			result.push(deck);
		}
		await Tools.sleep(100);
	}
	return result;
}

const getDecklist = async function(deckId) {
	if(!deckId)
		throw "invalid deckId: "+deckId;
	let pageText = await Scraper.downloadPage(Configuration.mtggoldfish.baseUrl+'/deck/download/'+deckId);
	// console.log('deck text', pageText);
	let deck = Scraper.parseDeck(pageText);
	return deck;
}

module.exports = {
    getTournaments: getTournaments,
    getDecksForTournament: getDecksForTournament,
    getDecklist: getDecklist,
}