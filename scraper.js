const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

const buildTournamentSearchUrl = function(base, dateStart, dateEnd, pageNo, format) {
	let url = base+
	'/tournament_searches/create'+
	'?commit=Search'+
	'&page='+(pageNo ? pageNo : '1')+
	'&utf8='+encodeURIComponent('✓')+	
	'&tournament_search%5Bname%5D='+
	'&tournament_search%5Bformat%5D='+(format ? encodeURIComponent(format) : '')+
	'&tournament_search%5Bdate_range%5D='+encodeURIComponent(moment(dateStart).format('MM/DD/YYYY'))+'+-+'+encodeURIComponent(moment(dateEnd).format('MM/DD/YYYY'));
	return url;
}

// TODO: add pagination support
const downloadPage = function(url) {
	return new Promise((resolve, reject) => {
		console.log('downloading page..', url);
		request.get(url, (error, response, body) => {
			if(error)
				reject(error);
			resolve(body);
		});
	});
}

const parseTournaments = function(html) {
	let $ = cheerio.load(html);
	let tournaments = [];

	$('table tr').each(function(index, element) {
		let tournament = {};
		let cells = $(element).children();
		tournament['date'] = $(cells[0]).text().trim();
		tournament['name'] = $(cells[1]).find('a').text().trim();
		tournament['format'] = $(cells[2]).text().trim();
		tournament['url'] = $(cells[1]).find('a').attr('href');
		let parseTournamentUrl = function(url) { // TODO: replace with some proper regex
			if(!url)
				return;

			let parts = url.split('/');
			if(parts.length)
				return parts[parts.length-1];

			return;
		}
		tournament['id'] = parseTournamentUrl(tournament['url']); 
		tournaments.push(tournament);
	});

	return tournaments;
}

const parseDecks = function(html) {
	let $ = cheerio.load(html);
	let decks = [];

	let tableHeaders = $('table.table-tournament > thead > tr > th');
	let nameColumnIndex, playerColumnIndex, positionColumnIndex;
	for(var i = 0; i < tableHeaders.length; i++) {
		let th = tableHeaders.get(i);
		if($(th).text().trim() === 'Position')
			positionColumnIndex = i;
		if($(th).text().trim() === 'Pilot')
			playerColumnIndex = i;
		if($(th).text().trim() === 'Deck')
			nameColumnIndex = i;
	}

	$('table.table-tournament').find('tr.tournament-decklist-odd, tr.tournament-decklist-event').each(function(index, tableRow) {
		let deck = {};
		let rowCells = $(tableRow).children();
		deck['position'] = positionColumnIndex ? $(rowCells[0]).text().trim() : index+1;
		deck['name'] = $(rowCells[nameColumnIndex]).text().trim();
		deck['player'] = $(rowCells[playerColumnIndex]).text().trim();
		deck['url'] = $(rowCells[nameColumnIndex]).find('a').attr('href');
		let parseDeckUrl = function(url) { // TODO: replace with some proper regex
			if(!url)
				return;

			let parts = url.split('/');
			if(parts.length)
				return parts[parts.length-1];

			return;
		}
		deck['id'] = parseDeckUrl(deck['url']); 
		decks.push(deck);
	});

	return decks;
}

const parseDeck = function(text) {
	let decklist = {
		mainboard: [],
		sideboard: [],
	};

	let lines = text.split('\n');
	
	let lineNo = 0;
	let line = lines[lineNo] ? lines[lineNo].trim() : '';
	// console.log('main');
	while(line && line.length > 0) {
		decklist.mainboard.push(parseCard(line));
		lineNo += 1;
		line = lines[lineNo] ? lines[lineNo].trim() : '';
	}

	line = lines[++lineNo];

	// console.log('side');
	while(line && line.length > 0) {
		decklist.sideboard.push(parseCard(line));
		lineNo += 1;
		line = lines[lineNo] ? lines[lineNo].trim() : '';
	}

	let mainboardTotal = decklist.mainboard.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
	if(mainboardTotal < 60)
		throw "invalid deck: "+mainboardTotal+" mainboard cards";
	let sideboardTotal = decklist.sideboard.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
	if(sideboardTotal < 15)
		throw "invalid deck: "+sideboardTotal+" sideboard cards";

	return decklist;
}

const parseCard = function(text) {
	// console.log('text: "'+text+'"');
	let parts = text.split(/\s(.+)/);
	let card = {};
	card.quantity = parseInt(parts[0]);
	card.name = parts[1].trim();

	let basicLandsRegex = /Plains|Forest|Mountain|Island|Swamp/g;
	if((!card.name.match(basicLandsRegex) && card.quantity > 4) || card.quantity < 0)
		throw "invalid card quantity: "+text;

	return card;
}

module.exports = {
	buildTournamentSearchUrl: buildTournamentSearchUrl,
	downloadPage: downloadPage,
	parseTournaments: parseTournaments,
	parseDecks: parseDecks,
	parseDeck: parseDeck,
};