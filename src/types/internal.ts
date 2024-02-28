import { Segments, TrackerPlatformInfo } from './tracker';

export type Platform = 'steam' | 'epic' | 'psn' | 'xbl';

export type GenericOptions = {
    raw?: boolean;
};

export type OverviewStats = {
    wins: number;
    goals: number;
    mVPs: number;
    saves: number;
    assists: number;
    shots: number;
    goalShotRatio: number;
    score: number;
    seasonRewardLevel: number;
    seasonRewardWins: number;
    tRNRating: number;
    _raw?: Segments;
};

export type PlaylistStats = {
    rank: string;
    tier: number;
    division: number;
    matchesPlayed: number;
    winStreak: number;
    rating: number;
    peakRating: number | null;
    _raw?: Segments;
};

export type GamemodesStats = {
    [playlist: string]: PlaylistStats;
};

export type AllStats = {
    overview: OverviewStats;
    gamemodes: GamemodesStats;
};

export type Userinfo = {
    platform: TrackerPlatformInfo['platformSlug'];
    uuid: TrackerPlatformInfo['platformUserId'];
    name: TrackerPlatformInfo['platformUserHandle'];
    userid: TrackerPlatformInfo['platformUserIdentifier'];
    avatar: TrackerPlatformInfo['avatarUrl'];
};
