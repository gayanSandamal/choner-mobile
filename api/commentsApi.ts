import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Create Comment
export type CreateCommentProps = {
    uid: string
    postId: string
    comment: string
    type: string
}

export const createComments = async ({postId, comment, type}: CreateCommentProps) => {
    const data = { postId, comment, type }
    return axios.post('/createComment', { data })
}

// Get Comments
export type GetCommentProps = {
    postId: string
    type: string
    lastVisible: any
}

export const getComments = async ({postId, type, lastVisible}: GetCommentProps) => {
    const data = { postId, type, lastVisible }
    return axios.post('/getComments', { data })
}

// Update Comments
export type UpdateCommentProps = {
    uid: string
    commentId: string
    type: string
    comment: string
    postId: string
}

export const updateComments = async ({commentId, comment, type}: UpdateCommentProps) => {
    const data = { commentId, comment, type }
    return axios.post('/updateComment', { data })
}

// Get Replies
export type GetRepliesProps = {
    postId: string
    commentId: string
    type: string
    lastVisible: any
}

export const getReplies = async ({postId, commentId, type, lastVisible}: GetRepliesProps) => {
    const data = { postId, commentId, type, lastVisible }
    return axios.post('/getReplies', { data })
}
