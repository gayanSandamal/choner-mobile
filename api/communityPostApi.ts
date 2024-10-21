import { POST_VISIBILITY } from "@/constants/values"
import { ImageSizes } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"
import * as SecureStore from 'expo-secure-store'

const axios = getAxios(true)

// Create Community post
export type CreateCommunityPostProps = {
    uid: string
    title: string
    type: string
    imageUrls?: ImageSizes
    scheduledAt?: string
}

export const createCommunityPost = async ({uid, title, type, imageUrls, scheduledAt}: CreateCommunityPostProps) => {
    const data = { uid, title, type, imageUrls, scheduledAt }
    return axios.post('/createCommunityPost', { data })
}

// Get community posts
type GetCommunityProps = {
    type: string
    lastPostId?: string
}
export const getCommunityPosts = async (props: GetCommunityProps) => {

    return axios.post('/getPaginatedCommunityPost', {
        data: {
            type: props.type,
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}

// Get user community posts
type GetUserCommunityProps = {
    visibility: string
    uid: string
    type: string
    lastPostId?: string
}

export const getUserCommunityPosts = async (props: GetUserCommunityProps) => {

    const data = axios.post('/getPaginatedUserSpecificCommunityPosts', {
        data: {
            type: props.type,
            uid: props.uid,
            visibility: props.visibility,
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })

    return axios.post('/getPaginatedUserSpecificCommunityPosts', {
        data: {
            type: props.type,
            uid: props.uid,
            visibility: props.visibility,
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}
