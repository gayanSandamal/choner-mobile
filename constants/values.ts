export const enum Screens {
    INITIAL = 'initial',
    SIGN_IN = 'sign-in',
    SIGN_UP = 'sign-up',
    FORGOT_PASSWORD = 'forgot-password'
}

export const enum QueryKeys {
    USER = 'user',
    INTERESTS = 'interests',
    USER_INTERESTS = 'userInterests',
    COMMUNITY = 'community',
    USER_COMMUNITY = 'userCommunity',
}

export const DURATIONS = {
    SECOND: 1000,
    ONE_MINUTE: 1000 * 60,
    FIVE_MINUTES: 1000 * 60 * 10,
    DAY: 86400000
}

export const enum StoragePaths {
    USER = 'users/',
    COMMUNITY_POST = 'community/posts/',
    COMMUNITY_QUESTION = 'community/questions/',

}
