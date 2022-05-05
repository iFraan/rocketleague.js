const { exec } = require('child_process');

const PLATFORM = {
    Steam: 'steam',
    Epic: 'epic',
    Playstation: 'psn',
    Xbox: 'xbl'
}

const baseUrl = `https://api.tracker.gg/api/v2/rocket-league/standard/profile/{PLATFORM}/{USERNAME}`

const fetch = (url) => new Promise((resolve, reject) => {
    exec(`curl --max-time 5 --user-agent 'Chrome/79' --url ${url}`, (err, result, stderr) => {
        if (!result) {
            reject(err)
        }
        resolve(JSON.parse(result))
    })

})


class RLAPI {
    /**
     * Use RLAPI.fetchUser instead.
     * @param {string} platform 
     * @param {string} username 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor (platform, username){
        this.platform = platform;
        this.username = username;
    }


    /**
     * Initialize the wrapper
     * @param {string} platform 
     * @param {string} username 
     * @returns RLAPI instance
     */
    static async fetchUser(platform, username){
        const API = new RLAPI(platform, username)
        API._raw = await fetch(baseUrl.replace('{PLATFORM}', platform).replace('{USERNAME}', username))
        if (API._raw.errors) throw new Error(API._raw.errors[0].message)
        return API;
    }


    /**
     * Overview
     * @param {boolean?} options.raw raw data
     * @returns General stats of the player
     */
    overview(options = {}){
        const result = {}
        const raw   = options.raw || false;
        const data  = this._raw.data.segments.find(x => x.type == 'overview');
        if (raw)    result._raw = data;
        const keys = Object.keys(data.stats)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }
        return result;
    }

    /**
     * 2v2
     * @param {boolean?} options.raw raw data
     * @returns Ranked 2v2 stats of the player
     */
     get2v2(options = {}){
        const result = {}
        const raw   = options.raw || false;
        const data  = this._raw.data.segments.find(x => x.metadata.name == 'Ranked Doubles 2v2');
        if (raw)    result._raw = data;
        const keys = Object.keys(data.stats)
        result['rank'] = data.stats.tier.metadata.name;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }
        return result;
    }

    /**
     * 3v3
     * @param {boolean?} options.raw raw data
     * @returns Ranked 3v3 stats of the player
     */
     get3v3(options = {}){
        const result = {}
        const raw   = options.raw || false;
        const data  = this._raw.data.segments.find(x => x.metadata.name == 'Ranked Standard 3v3');
        if (raw)    result._raw = data;
        const keys = Object.keys(data.stats)
        result['rank'] = data.stats.tier.metadata.name;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }
        return result;
    }


    /**
     * Get all data
     * @returns Formated json of all available player data
     */
    getData() { 
        const result = {};
        result['overview']  = this.overview();
        result['gamemodes'] = {}
        const playlists = this._raw.data.segments.filter(x => x.type === 'playlist');
        for (let i = 0 ; i < playlists.length ; i++) {
            const p = playlists[i]
            if (p) {
                const keys = Object.keys(p.stats)
                result['gamemodes'][p.metadata.name] = {}
                result['gamemodes'][p.metadata.name]['rank'] = p.stats.tier.metadata.name;
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    result['gamemodes'][p.metadata.name][key] = p.stats[key].value;
                }
            }
        }

        return result;

    }
    /**
     * Get userinfo from the platform
     * @returns userinfo
     */
    getUserinfo() { 
        const result = {};
        const platform = this._raw.data.platformInfo;

        result['platform']  = platform.platformSlug; 
        result['uuid']      = platform.platformUserId; 
        result['name']      = platform.platformUserHandle;
        result['userid']    = platform.platformUserIdentifier;
        result['avatar']    = platform.avatarUrl;

        return result;
    }

    get raw() { return this._raw; }
}

module.exports = {
    RLAPI,
    PLATFORM
}