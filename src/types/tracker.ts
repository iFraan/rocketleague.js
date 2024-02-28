export type TrackerPlatformInfo = {
    platformSlug: string;
    platformUserId: string;
    platformUserHandle: string;
    platformUserIdentifier: string;
    avatarUrl: string | null;
    additionalParameters: unknown | null;
};

export type TrackerUserInfo = {
    userId: unknown;
    isPremium: boolean;
    isVerified: boolean;
    isInfluencer: boolean;
    isPartner: boolean;
    countryCode: string | null;
    customAvatarUrl: string | null;
    customHeroUrl: string | null;
    customAvatarFrame: unknown;
    customAvatarFrameInfo: unknown;
    premiumDuration: unknown;
    socialAccounts: unknown[];
    pageviews: number;
    xpTier: unknown;
    isSuspicious: boolean | null;
};

export type TrackerMetadata = {
    lastUpdated?: {
        value: string;
        displayValue: string;
    };
    playerId: number;
    currentSeason: number;
};

type SegmentStat = {
    rank: number | unknown | null;
    percentile: unknown | null;
    displayName: string;
    displayCategory: string;
    category: string;
    description: unknown | null;
    metadata: {
        name?: string;
        iconUrl?: string;
    };
    value: number | string;
    displayValue: string;
    displayType: string;
};

export type SegmentOverviewStats = {
    wins: SegmentStat;
    goals: SegmentStat;
    mVPs: SegmentStat;
    saves: SegmentStat;
    assists: SegmentStat;
    shots: SegmentStat;
    goalShotRatio: SegmentStat;
    score: SegmentStat;
    seasonRewardLevel: SegmentStat;
    seasonRewardWins: SegmentStat;
    tRNRating: SegmentStat;
};

export type SegmentPlaylistStats = {
    tier: SegmentStat;
    division: SegmentStat;
    matchesPlayed: SegmentStat;
    winStreak: SegmentStat;
    rating: SegmentStat;
    peakRating: SegmentStat;
};

export type Segments = {
    type: 'overview' | 'playlist';
    attributes?: {
        playlistId: number;
        season: number;
        key?: string | null;
    };
    metadata?: {
        name: string;
    };
    stats: SegmentOverviewStats | SegmentPlaylistStats;
    expiryDate: string;
};

export type TrackerResponse = {
    data: {
        platformInfo: TrackerPlatformInfo;
        userInfo: TrackerUserInfo;
        metadata: TrackerMetadata;
        segments: Segments[];
        availableSegments: unknown[];
        expiryDate: string;
    };
    errors?: { message: string }[];
};
