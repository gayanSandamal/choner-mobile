import { ImageSizes } from "@/types/Components"
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
    location: string
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