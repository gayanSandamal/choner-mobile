import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Create Community post
export type CreateCommunityPostProps = {
    uid: string
    title: string
    type: string
    imageUrl?: string
    scheduledAt?: string
}

export const createCommunityPost = async ({uid, title, type, imageUrl, scheduledAt}: CreateCommunityPostProps) => {
    const data = { uid, title, type, imageUrl, scheduledAt }
    return axios.post('/createCommunityPost', { data })
}
