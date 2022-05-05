# RocketLeague.js
## This a wrapper/scrapper of the TRNetwork site with rocket league stats.

There are no dependencies and no API key required.

To install use:
```shell
npm i rocketleague.js
```


Example code: _(Feel free to use my steam username for testing)_
```js
const { RLAPI, PLATFORM } = require('rocketleague.js')

try {
    const user = await RLAPI.fetchUser(PLATFORM.Steam, 'iFraan_')
	

    console.log('User:', user.getUserinfo())
	/*
	User: {
		platform: 'steam',
		uuid: null,
		name: 'fran',
		userid: '76561198137433783',
		avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24_full.jpg'
	}
	*/

    console.log('Overview:',    user.overview())
    /*
    Overview {
        wins: 131,
        goals: 209,
        mVPs: 14,
        saves: 108,
        assists: 125,
        shots: 412,
        goalShotRatio: 50.728155339805824,
        score: 24435.3,
        seasonRewardLevel: 0,
        seasonRewardWins: 0,
        tRNRating: 0
    }
    */

    console.log('2v2: ',        user.get2v2())
    /*
    2v2 {
        rank: 'Silver III',
        tier: 6,
        division: 2,
        matchesPlayed: 0,
        winStreak: 5,
        rating: 443
    }
    */
    console.log('3v3: ',        user.get3v3())
    /*
    3v3:  {
        rank: 'Gold I',
        tier: 7,
        division: 3,
        matchesPlayed: 0,
        winStreak: 3,
        rating: 520
    }
    */
    console.log('ALL: ',        user.getData())
    /* 
    ALL  {
    	overview: {
        	wins: 131,
            goals: 209,
            mVPs: 14,
            saves: 108,
            assists: 125,
            shots: 412,
            goalShotRatio: 50.728155339805824,
            score: 24435.3,
            seasonRewardLevel: 0,
            seasonRewardWins: 0,
            tRNRating: 0
        },
        gamemodes: {
            'Un-Ranked': {
              rank: 'Unranked',
              tier: 0,
              division: 0,
              matchesPlayed: 0,
              winStreak: 0,
              rating: 380
            },
            'Ranked Doubles 2v2': {
              rank: 'Silver III',
              tier: 6,
              division: 2,
              matchesPlayed: 0,
              winStreak: 5,
              rating: 443
            },
            'Ranked Standard 3v3': {
              rank: 'Gold I',
              tier: 7,
              division: 3,
              matchesPlayed: 0,
              winStreak: 3,
              rating: 520
            },
            Hoops: {
              rank: 'Gold II',
              tier: 8,
              division: 1,
              matchesPlayed: 0,
              winStreak: 1,
              rating: 542
            },
            Rumble: {
              rank: 'Gold II',
              tier: 8,
              division: 1,
              matchesPlayed: 0,
              winStreak: 1,
              rating: 530
            },
            Dropshot: {
              rank: 'Gold I',
              tier: 7,
              division: 2,
              matchesPlayed: 0,
              winStreak: 3,
              rating: 477
            }
        }
    }
    */
} catch (e) {
    console.log(e)
    /* Error: We could not find the player [player]. */
}
```