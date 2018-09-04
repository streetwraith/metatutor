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
            regex: /.*Pro.*Tour.*/g,
            format: 'modern',
        },
        {
            name: 'GP',
            regex: /.*Grand.*Prix.*/g,
            format: 'modern',
        },
        {
            name: 'SCG Open',
            regex: /.*SCG.*Open.*/g,
            format: 'modern',
        },
        {
            name: 'SCG Classic',
            regex: /.*SCG.*Classic.*/g,
            format: 'modern',
        },
        {
            name: 'SCG IQ',
            regex: /.*SCG.*IQ.*/g,
            format: 'modern',
        },
        {
            name: 'MTGO Challenge',
            regex: /.*Challenge.*/,
            format: 'modern',
        },
        {
            name: 'MTGO MOCS',
            regex: /.*MOCS.*/,
            format: 'modern',
        },
    ]
}