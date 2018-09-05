module.exports = {
    mtggoldfish: {
        baseUrl: 'https://www.mtggoldfish.com',
        tournamentDateFormat: 'YYYY-MM-DD',
        sleepTournamentsDownload: 100,
        sleepDecksDownload: 100 
    },
    db: {
        url: 'mongodb://127.0.0.1:27017/metatutor'
    },
    deckArchetypes: {
        FETCHLESS_STORM: {
			name: 'Fetchless Storm',
			format: 'modern',
			includedCards: ['Shivan Reef', 'Past in Flames', 'Grapeshot'],
			excludedCards: ['Scalding Tarn'],
		},
        GDS: {
            name: 'GDS',
            format: 'modern',
            includedCards: ['Death\'s Shadow', 'Street Wraith', 'Gurmag Angler'],
            excludedCards: ['Tarmogoyf'],
        },
        GX_TRON: {
            name: 'Tron',
            format: 'modern',
            includedCards: ['Urza\'s Tower', 'Urza\'s Power Plant',  'Urza\'s Mine', 'Sylvan Scrying'],
            excludedCards: ['Eldrazi Temple'],
        },
        BLUE_MOON: {
            name: 'Blue Moon',
            format: 'modern',
            includedCards: ['Snapcaster Mage', 'Blood Moon', 'Lightning Bolt', 'Scalding Tarn'],
            excludedCards: ['Tarmogoyf'],
        }
    },
    tournamentTypes: {
        PRO_TOUR: {
            name: 'Pro Tour',
            regex: /.*Pro.*Tour.*/g,
            format: 'modern',
        },
        GP: {
            name: 'GP',
            regex: /.*Grand.*Prix.*/g,
            format: 'modern',
        },
        SCG_OPEN: {
            name: 'SCG Open',
            regex: /.*SCG.*Modern.*Open.*/g,
            format: 'modern',
        },
        SCG_CLASSIC: {
            name: 'SCG Classic',
            regex: /.*SCG.*Modern.*Classic.*/g,
            format: 'modern',
        },
        SCG_IQ: {
            name: 'SCG IQ',
            regex: /.*SCG.*Modern.*IQ.*/g,
            format: 'modern',
        },
        SCG_REGIONALS: {
            name: 'SCG Regionals',
            regex: /.*SCG.*Regionals.*/,
            format: 'modern',
        },
        MTGO_CHALLENGE: {
            name: 'MTGO Challenge',
            regex: /.*Modern.*Challenge.*/,
            format: 'modern',
        },
        MTGO_MOCS: {
            name: 'MTGO MOCS',
            regex: /.*Modern.*MOCS.*/,
            format: 'modern',
        },
        MTGO_WORLD_CHAMPIONSHIP: {
            name: 'Magic Online World Championship',
            regex: /.*Magic.*Online.*World.*Championship.*/,
            format: 'modern',
        },
        PTQ: {
            name: 'Modern PTQ',
            regex: /.*Modern.*PTQ.*/,
            format: 'modern',
        }
    }
}