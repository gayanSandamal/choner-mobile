import { ImageSizes, LocationData } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Create Update Challenge post
export type CreateUpdateChallengePostProps = {
    uid: string
    participantStatus: string
    challengeState: string
    type: string
    participationRangeId: string
    description: string
    location: LocationData
    challengeAt: string
    joinAnyone: boolean
    id?: string
}

export const createUpdateChallengePost = async ({id, participantStatus, challengeState, type, participationRangeId, description, location, challengeAt, joinAnyone}: CreateUpdateChallengePostProps) => {
    if (id) {
        const data = { id, participantStatus, challengeState, participationRangeId, description, location, challengeAt, joinAnyone }
        return axios.post('/updateChallengeHandler', { data })
    }
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
export const toggleUserChallengeStatus = async ({challengeId}: ToggleUserChallengeStatusProps) => {
    const data = { challengeId }
    return axios.post('/toggleChallengeParticipationHandler', { data })
}

// Delete Challenge
type DeleteChallengeProps = {
    uid: string
    type: string
    challengeId: string
}
export const deleteChallengePost = async ({challengeId, type}: DeleteChallengeProps) => {
    const data = { id: challengeId, type }
    return axios.post('/deleteChallengeHandler', { data })
}

// Pending Challenge Participants
type PendingChallengeParticipantsProps = {
    uid: string
    challengeId: string
    lastPostId?: string
}
export const getPendingChallengeParticipants = async ({challengeId}: PendingChallengeParticipantsProps) => {
    const data = { challengeId }
    return axios.post('/getParticipantsToBeJoinedHandler', { data })
}

// Bulk Approve Challenge Participants
type BulkApproveRequestedParticipantsProps = {
    uid: string
    challengeId: string
    uids: string[]
}
export const bulkApproveRequestedParticipants =  async ({challengeId, uids}: BulkApproveRequestedParticipantsProps) => {
    const data = { challengeId, uids }
    return axios.post('/bulkApproveJoinChallengeParticipantsHandler', { data })
}
