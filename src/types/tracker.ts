export type TrackerPlatformInfo = {
    platformSlug: string;
    platformUserId: string;
    platformUserHandle: string;
    platformUserIdentifier: string;
    avatarUrl: string;
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
    stats: any;
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
