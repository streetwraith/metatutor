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
            regex: /.*SCG.*Modern.*Open.*/g,
            format: 'modern',
        },
        {
            name: 'SCG Classic',
            regex: /.*SCG.*Modern.*Classic.*/g,
            format: 'modern',
        },
        {
            name: 'SCG IQ',
            regex: /.*SCG.*Modern.*IQ.*/g,
            format: 'modern',
        },
        {
            name: 'MTGO Challenge',
            regex: /.*Modern.*Challenge.*/,
            format: 'modern',
        },
        {
            name: 'MTGO MOCS',
            regex: /.*Modern.*MOCS.*/,
            format: 'modern',
        },
        {
            name: 'Magic Online World Championship',
            regex: /.*Magic.*Online.*World.*Championship.*/,
            format: 'modern',
        },
        {
            name: 'SCG Regionals',
            regex: /.*SCG.*Regionals.*/,
            format: 'modern',
        },
        {
            name: 'Modern PTQ',
            regex: /.*Modern.*PTQ.*/,
            format: 'modern',
        }
    ]
}