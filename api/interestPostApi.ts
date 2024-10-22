import { POST_VISIBILITY } from "@/constants/values"
import { getAxios } from "@/utils/AxiosUtils"
import * as SecureStore from 'expo-secure-store'

const axios = getAxios(true)

// Get user interest posts
type GetInterstsProps = {
    lastPostId?: string
}

export const getInterests = async (props: GetInterstsProps) => {
    return axios.post('/getPaginatedInterests', {
        data: {
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}

// Get user interest posts
type GetUserInterstsProps = {
    visibility: string
    lastPostId?: string
}

export const getUserInterests = async (props: GetUserInterstsProps) => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    return axios.post('/getPaginatedUserSpecificInterests', {
        data: {
            uid,
            visibility: props.visibility,
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}

// Create interest post
export type CreateInterestProps = {
    uid: string
    title: string
    description: string
    scheduledAt?: string
}

export const createInterest = async ({uid, title, description, scheduledAt}: CreateInterestProps) => {
    const data = { uid, title, description, scheduledAt }
    return axios.post('/createInterest', { data })
}

// Update interest post
export type UpdateInterestProps = {
    id: string
    uid: string
    title: string
    description: string
    scheduledAt?: string
}

export const updateInterest = async ({id, uid, title, description, scheduledAt}: UpdateInterestProps) => {
    const data = { id, uid, title, description, scheduledAt }
    return axios.post('/updateInterest', { data: data })
}

export type DeleteInterestProps = {
    id: string
    uid: string
}

// Delete Interest post
export const deleteInterest = async ({id}: DeleteInterestProps) => {
    return axios.post('/deleteInterest', { data: { id } })
}
