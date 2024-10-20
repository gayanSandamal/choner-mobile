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

// Get user community posts
type GetCommunityProps = {
    uid: string
    type: string
    isUser?: boolean
    lastPostId?: string
}
export const getCommunityPosts = async (props: GetCommunityProps) => {
    const url = props.isUser? '/getPaginatedUserSpecificCommunityPost': '/getPaginatedCommunityPost'

    return axios.post(url, {
        data: {
            type: props.type,
            ...(props.isUser && {uid: props.uid}),
            ...(props.lastPostId && {lastVisible: props.lastPostId})
        }
    })
}
