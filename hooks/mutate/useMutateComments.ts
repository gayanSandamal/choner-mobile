import { createComments, createReply, updateComments, updateReply } from "@/api/commentsApi"
import { QueryKeys } from "@/constants/values"
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
                return addOrUpdateCommentsInCache(cachedData, newComment, 'comments')
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
              return addOrUpdateCommentsInCache(cachedData, updatedComment, 'comments')
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
              return addOrUpdateCommentsInCache(cachedData, newComment, 'replies')
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
              return addOrUpdateCommentsInCache(cachedData, updatedComment, 'replies')
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
  
  const addOrUpdateCommentsInCache = (cachedData: any, newComment: any, key: string) => {
    const updatedPages = cachedData.pages.map((page: any) => {
      const existingIndex = page.data.result?.[key].findIndex((comment: any) => comment.id === newComment.id);
      if (existingIndex !== -1) {
        const updatedComments = [...page.data.result?.[key]]
        updatedComments[existingIndex] = newComment
        return {
          ...page,
          data: {
            ...page.data,
            result: {
              ...page.data.result,
              [key]: updatedComments,
            },
          },
        };
      }
      return page
    })
  
    const isUpdated = updatedPages.some((page: any) =>
      page.data.result?.[key].some((comment: any) => comment.id === newComment.id)
    )
  
    if (!isUpdated && updatedPages.length > 0) {
      updatedPages[0] = {
        ...updatedPages[0],
        data: {
          ...updatedPages[0].data,
          result: {
            ...updatedPages[0].data.result,
            [key]: [newComment, ...updatedPages[0].data.result?.[key]],
          },
        },
      }
    }
  
    return {
      ...cachedData,
      pages: updatedPages,
    }
  }
  