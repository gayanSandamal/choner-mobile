import { createComments, createReply, updateComments, updateReply } from "@/api/commentsApi"
import { QueryKeys } from "@/constants/values"
import { addOrUpdateItemsInCache } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateComment = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createComments,
        async onSuccess(data, variables) {
            if (data?.status === 200) {
              const newComment = data?.data?.result?.data

              const existingCache = await queryClient.getQueryData([QueryKeys.COMMENTS, variables.postId, variables.type, variables.uid])

              if (!existingCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.COMMENTS, variables.postId, variables.type, variables.uid]})
                onSuccess()
                return
              }

              await queryClient.setQueryData([QueryKeys.COMMENTS, variables.postId, variables.type, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateItemsInCache(cachedData, newComment, 'comments')
              })
              onSuccess()
            }
        },
        onError,
    })
}

export const useUpdateComment = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: updateComments,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            const updatedComment = data?.data?.result?.data

            await queryClient.setQueryData([QueryKeys.COMMENTS, variables.postId, variables.type, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData;
              return addOrUpdateItemsInCache(cachedData, updatedComment, 'comments')
            })
            onSuccess()
          }
      },
      onError,
  })
}

export const useCreateReply = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: createReply,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            const newComment = data?.data?.result?.data

            const existingCache = await queryClient.getQueryData([QueryKeys.REPLIES, variables.postId, variables.commentId, variables.type, variables.uid])

            if (!existingCache) {
              await queryClient.invalidateQueries({queryKey: [QueryKeys.REPLIES, variables.postId, variables.commentId, variables.type, variables.uid]})
              onSuccess()
              return
            }

            await queryClient.setQueryData([QueryKeys.REPLIES, variables.postId, variables.commentId, variables.type, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData;
              return addOrUpdateItemsInCache(cachedData, newComment, 'replies')
            })
            onSuccess()
          }
      },
      onError,
  })
}

export const useUpdateReply = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: updateReply,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            const updatedComment = data?.data?.result?.data

            await queryClient.setQueryData([QueryKeys.REPLIES, variables.postId, variables.commentId, variables.type, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData;
              return addOrUpdateItemsInCache(cachedData, updatedComment, 'replies')
            })
            onSuccess()
          }
      },
      onError,
  })
}

const updatePageOnDelete = (cachedData: any, commentId: string) => {
    const updatedPages = cachedData.pages.map((page: any) => ({
      ...page,
      data: {
        ...page.data,
        result: {
          ...page.data.result,
          comments: page.data.result.comments.filter(
            (comment: any) => comment.id !== commentId
          ),
        },
      },
    }))
  
    return updatedPages
  }
  
  