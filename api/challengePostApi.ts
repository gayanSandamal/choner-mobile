import { ImageSizes, LocationData } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Create Challenge post
export type CreateChallengePostProps = {
    uid: string
    participantStatus: string
    challengeState: string
    type: string
    participationRangeId: string
    description: string
    location: LocationData
    challengeAt: string
    joinAnyone: boolean
}

export const createChallengePost = async ({participantStatus, challengeState, type, participationRangeId, description, location, challengeAt, joinAnyone}: CreateChallengePostProps) => {
    const data = { participantStatus, challengeState, type, participationRangeId, description, location, challengeAt, joinAnyone }
    return axios.post('/createChallengeHandler ', { data })
}

// Get Challenge posts
type GetChallengeProps = {
    lastPostId?: string
}
export const getChallengePosts = async (props: GetChallengeProps) => {
    return axios.post('/getPaginatedChallengesHandler', {
        data: {
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}

// Get User Challenge posts
type GetUserChallengeProps = {
    lastPostId?: string
}
export const getUserChallengePosts = async (props: GetChallengeProps) => {

    return axios.post('/getPaginatedChallengesHandler', {
        data: {
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}

// Toggle User Challenge posts join
type ToggleUserChallengeStatusProps = {
    uid: string
    challengeId?: string
}
export const toggleUserChallengeStatus = async (props: ToggleUserChallengeStatusProps) => {

    return axios.post('/toggleParticipationHandler', {
        challengeId: props.challengeId,
    })
}