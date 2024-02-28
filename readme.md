<div align="center">
    <h1>RocketLeague.js</h1>
    <a href="https://www.codefactor.io/repository/github/ifraan/rocketleague.js"><img src="https://www.codefactor.io/repository/github/ifraan/rocketleague.js/badge" alt="CodeFactor" /></a>
    <a href="https://www.npmjs.com/package/rocketleague.js"><img src="https://badgen.net/npm/v/rocketleague.js?color=blue" alt="NPM-Version"/></a>
    <a href="https://www.npmjs.com/package/rocketleague.js"><img src="https://badgen.net/npm/dt/rocketleague.js?color=blue" alt="NPM-Downloads"/></a>
    <a href="https://github.com/iFraan/rocketleague.js"><img src="https://badgen.net/github/stars/iFraan/rocketleague.js?color=yellow" alt="Github Stars"/></a>
    <a href="https://github.com/iFraan/rocketleague.js/issues"><img src="https://badgen.net/github/open-issues/iFraan/rocketleague.js?color=green" alt="Issues"/></a>
    <h2>This a wrapper/scrapper of the TRNetwork site with <b>Rocket League</b> stats.</h2>
    <h3>There are no dependencies nor API key required.</h3>
</div>

To install use:
```shell
npm i rocketleague.js
```


Example code: _(Feel free to use my steam username for testing)_
```js
const { API, PLATFORM } = require('rocketleague.js')

try {
    const user = await API.fetchUser(PLATFORM.Epic, 'iFraan')
    /* Platform can be Steam, Epic, Playstation or Xbox */
    
    console.log('User:', user.getUserinfo())
    /*
    User: {
        platform: 'epic',
        uuid: 'fc0c61fe-8e96-48db-be12-80af22912376',
        name: 'iFraan',
        userid: 'iFraan',
        avatar: null
    }
    */

    console.log('Overview:', user.overview())
    /*
    Overview: {
        wins: 153,
        goals: 268,
        mVPs: 22,
        saves: 128,
        assists: 141,
        shots: 512,
        goalShotRatio: 52.34375,
        score: 29507.94,
        seasonRewardLevel: 0,
        seasonRewardWins: 0,
        tRNRating: 0
    }
    */

    console.log('2v2: ', user.get2v2())
    /*
    2v2: {
        rank: 'Gold I',
        tier: 7,
        division: 2,
        matchesPlayed: 0,
        winStreak: 2,
        rating: 511,
        peakRating: null
    }
    */
    console.log('3v3: ', user.get3v3())
    /*
    3v3: {
        rank: 'Gold I',
        tier: 7,
        division: 2,
        matchesPlayed: 0,
        winStreak: 5,
        rating: 505,
        peakRating: null
    }
    */
    console.log('ALL: ', user.getData())
    /* 
    ALL {
        overview: {
            wins: 153,
            goals: 268,
            mVPs: 22,
            saves: 128,
            assists: 141,
            shots: 512,
            goalShotRatio: 52.34375,
            score: 29507.94,
            seasonRewardLevel: 0,
            seasonRewardWins: 0,
            tRNRating: 0
        },
        gamemodes: {
            'Ranked Duel 1v1': {
                rank: 'Gold II',
                tier: 8,
                division: 1,
                matchesPlayed: 0,
                winStreak: 2,
                rating: 534,
                peakRating: null
            },
            'Ranked Doubles 2v2': {
                rank: 'Gold I',
                tier: 7,
                division: 2,
                matchesPlayed: 0,
                winStreak: 2,
                rating: 511,
                peakRating: null
            },
            'Ranked Standard 3v3': {
                rank: 'Gold I',
                tier: 7,
                division: 2,
                matchesPlayed: 0,
                winStreak: 5,
                rating: 505,
                peakRating: null
            },
            Hoops: {
                rank: 'Gold I',
                tier: 7,
                division: 2,
                matchesPlayed: 0,
                winStreak: 1,
                rating: 507,
                peakRating: null
            },
            Rumble: {
                rank: 'Gold I',
                tier: 7,
                division: 3,
                matchesPlayed: 0,
                winStreak: 1,
                rating: 505,
                peakRating: null
            },
            Dropshot: {
                rank: 'Platinum I',
                tier: 10,
                division: 3,
                matchesPlayed: 0,
                winStreak: 3,
                rating: 641,
                peakRating: null
            },
            'Un-Ranked': {
                rank: 'Unranked',
                tier: 0,
                division: 0,
                matchesPlayed: 0,
                winStreak: 0,
                rating: 411,
                peakRating: null
            }
        }
    }
    */
} catch (e) {
    console.log(e)
    /* Error: We could not find the player [player]. */
}
```
# Disclaimer
This project is fully for educational purposes and if you want to use the rocketleague api in a production/commertial enviroment you should ask for one at [Rocket League Support](https://support.rocketleague.com/hc/en-us) or email the guys at [TRNetwork](https://tracker.gg/).