import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

/*----------Comment APIs-----------*/

// Create Comment
export type CreateCommentProps = {
    uid: string
    postId: string
    comment: string
    type: string
}

export const createComments = async ({postId, comment, type}: CreateCommentProps) => {
    const data = { postId, comment, type }
    return axios.post('/createCommentHandler', { data })
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
    return axios.post('/updateCommentHandler', { data })
}

// Delete Comment
export type DeleteCommentProps = {
    uid: string
    commentId: string
    type: string
    postId: string
}

export const deleteComment = async ({commentId, postId, type}: DeleteCommentProps) => {
    const data = { commentId, postId, type }
    return axios.post('/deleteCommentHandler', { data })
}

// Get Comments
export type GetCommentProps = {
    postId: string
    type: string
    lastVisible: any
}

export const getComments = async ({postId, type, lastVisible}: GetCommentProps) => {
    const data = { postId, type, lastVisible }
    return axios.post('/getCommentsHandler', { data })
}


/*----------Reply APIs-----------*/

// Create Reply
export type CreateReplyProps = {
    uid: string
    postId: string
    replyCount: number
    commentId: string
    reply: string
    type: string
}

export const createReply = async ({postId, reply, commentId, type}: CreateReplyProps) => {
    const data = { postId, reply, commentId, type }
    return axios.post('/createReplyHandler', { data })
}

// Update Reply
export type UpdateReplyProps = {
    uid: string
    commentId: string
    replyId: string
    type: string
    reply: string
    postId: string
}

export const updateReply = async ({commentId, replyId, reply, type}: UpdateReplyProps) => {
    const data = { commentId, replyId, reply, type }
    return axios.post('/updateReplyHandler', { data })
}

// Delete Reply
export type DeleteReplyProps = {
    uid: string
    commentId: string
    replyId: string
    type: string
    postId: string
}

export const deleteReply = async ({replyId, type}: DeleteReplyProps) => {
    const data = { replyId, type }
    return axios.post('/deleteReplyHandler', { data })
}

// Get Replies
export type GetRepliesProps = {
    commentId: string
    type: string
    lastVisible: any
}

export const getReplies = async ({commentId, type, lastVisible}: GetRepliesProps) => {
    const data = { commentId, type, lastVisible }
    return axios.post('/getRepliesHandler', { data })
}
