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
    tournamentTypes: [
        {
            name: 'Pro Tour',
            regex: /.*Pro.*Tour.*/g
        },
        {
            name: 'GP',
            regex: /.*Grand.*Prix.*/g	
        },
        {
            name: 'SCG Open',
            regex: /.*SCG.*Open.*/g
        },
        {
            name: 'SCG Classic',
            regex: /.*SCG.*Classic.*/g
        },
        {
            name: 'SCG IQ',
            regex: /.*SCG.*IQ.*/g
        },
        {
            name: 'MTGO Challenge',
            regex: /.*Challenge.*/
        },
        {
            name: 'MTGO MOCS',
            regex: /.*MOCS.*/
        },
    ],

}