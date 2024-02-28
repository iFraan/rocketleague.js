import { exec } from 'child_process';
import { GenericOptions, OverviewStats, Platform, PlaylistStats } from './types/internal';
import { SegmentOverviewStats, SegmentPlaylistStats, TrackerResponse } from './types/tracker';

const PLATFORM = {
    Steam: 'steam',
    Epic: 'epic',
    Playstation: 'psn',
    Xbox: 'xbl',
} as const;

const BASE_URL = `https://api.tracker.gg/api/v2/rocket-league/standard/profile/{PLATFORM}/{USERNAME}`;

const fetchData = (url: string) =>
    new Promise((resolve, reject) => {
        exec(`curl --max-time 5 --user-agent 'Chrome/121' --url ${url}`, (err, result, stderr) => {
            if (!result) {
                reject(err);
            }
            resolve(JSON.parse(result));
        });
    });

class API {
    platform: Platform;
    username: string;
    _raw: TrackerResponse;

    constructor(platform: Platform, username: string) {
        this.platform = platform;
        this.username = username;
    }

    static async fetchUser(platform: Platform, username: string) {
        const instance = new API(platform, username);
        instance._raw = (await fetchData(BASE_URL.replace('{PLATFORM}', platform).replace('{USERNAME}', username))) as TrackerResponse;
        if (!!instance._raw.errors?.length) throw new Error(instance._raw.errors[0].message);
        return instance;
    }

    overview(options: GenericOptions = {}) {
        const result = {} as OverviewStats;
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.type == 'overview');
        if (raw) result._raw = data;
        const stats = data.stats as SegmentOverviewStats;
        for (const key in stats) {
            result[key] = data.stats[key].value;
        }
        return result;
    }

    get2v2(options: GenericOptions = {}) {
        const result = {} as PlaylistStats;
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.metadata.name == 'Ranked Doubles 2v2');
        const stats = data.stats as SegmentPlaylistStats;
        if (raw) result._raw = data;
        result.rank = stats.tier.metadata.name;
        for (const key in stats) {
            result[key] = data.stats[key].value;
        }
        return result;
    }

    get3v3(options: GenericOptions = {}) {
        const result: any = {};
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.metadata.name == 'Ranked Standard 3v3');
        if (raw) result._raw = data;
        const keys = Object.keys(data.stats);
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
        result['overview'] = this.overview();
        result['gamemodes'] = {};
        const playlists = this._raw.data.segments.filter((x) => x.type === 'playlist');
        for (let i = 0; i < playlists.length; i++) {
            const p = playlists[i];
            if (p) {
                const keys = Object.keys(p.stats);
                result['gamemodes'][p.metadata.name] = {};
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

        result['platform'] = platform.platformSlug;
        result['uuid'] = platform.platformUserId;
        result['name'] = platform.platformUserHandle;
        result['userid'] = platform.platformUserIdentifier;
        result['avatar'] = platform.avatarUrl;

        return result;
    }

    get raw() {
        return this._raw;
    }
}

export {
    API as RLAPI, // Compability
    API,
    PLATFORM,
};
