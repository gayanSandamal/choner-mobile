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
    COMMENTS = 'comments',
    REPLIES = 'replies',
    CHALLENGES = 'challenges',
    USER_CHALLENGES = 'userChallenges',
}

export const DURATIONS = {
    SECOND: 1000,
    ONE_MINUTE: 1000 * 60,
    FIVE_MINUTES: 1000 * 60 * 10,
    DAY: 86400000
}

export const POST_VISIBILITY = {
    PUBLIC: 'public',
    SCHEDULED: 'scheduled',
}

export const enum StoragePaths {
    USER = 'users/',
    COMMUNITY_POST = 'community/posts/',
    COMMUNITY_QUESTION = 'community/questions/',
}

export const enum ImageSizes {
    SM = '_200x200.png',
    MD = '_400x400.png',
    LG = '_1024x1024.png'
}

export const BLURHASH = [
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[',
    'KGDb~Jx[0M#3xrNa18t5}@',
    'LKO2:N%2Tw=w]~RBVZRi};RPxuwH',
    'LGF5?xYk^6#M@-5c,1J5@[or[Q6.',
    'LEHLh[WB2yk8pyoJadR*.7kCMdnj',
    'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
    'eC8FJL8#Dk.PRj.iRQM#%eWB%XV_V_jFoytKV|jcRPogadaPj@RRjJ',
    'eVED@i%1Ipw]RQ_M%fxaRkRj8{%M-oRkWX9aoztQn$ofR5X9Rjt7s:',
    'e77oSBu%GEO]vyQ8pyNcI9X.ACVW,syCR576K%ru#QbcUuf8t6%2wb',
    'e6DG$v1HJ6WTNa0f$yN?$Rsm=q+}J8$jJ91a]:}G1a$jWF1aJ6}GNa',
    'eKMN+m{tmu22-V;DElj1xbVx#8O?W?+wS$wJf$K6v$kRV@XSs*s;Na',
]

export const CommunityPostTypes = ['post', 'question']

export const peopleCountOption = [
    {
        label: '2 - 5',
        value: '1'
    },
    {
        label: '6 - 10',
        value: '2'
    },
    {
        label: '11 - 30',
        value: '3'
    }
]
