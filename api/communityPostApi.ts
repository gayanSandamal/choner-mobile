import { ImageSizes } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"

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

// Update community post
export type UpdateCommunityPostProps = {
    id: string
    uid: string
    title: string
    type: string
    scheduledAt?: string
}

export const updateCommunityPost = async ({id, uid, title, scheduledAt}: UpdateCommunityPostProps) => {
    const data = { id, uid, title, scheduledAt }
    return axios.post('/updateCommunityPost', { data: data })
}

// Delete Interest post
export type DeleteCommunityPostProps = {
    id: string
    uid: string
    type: string
    visibility: string
}

export const deleteCommunityPost = async ({id}: DeleteCommunityPostProps) => {
    return axios.post('/deleteCommunityPost', { data: { id } })
}
