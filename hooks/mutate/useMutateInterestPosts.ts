import { createInterest, deleteInterest, updateInterest } from "@/api/interestPostApi"
import { QueryKeys } from "@/constants/values"
import { isoDateTimeToSecond } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateInteresPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createInterest,
        onSuccess(data, variables) {
            if (data?.status === 200) {                
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
              ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
              : undefined

              if(parsedScheduledTime) {
                queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, variables.uid]})
                onSuccess()
                return
              }

              const newInterest = {
               ...data?.data?.result?.data,
               id: data?.data?.result?.id,
               scheduledAt: parsedScheduledTime,
              }

              queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateInterestInCache(cachedData, newInterest)
              })
              queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, variables.uid]})
            }
            onSuccess()
        },
        onError,
    })
}

export const useUpdateInteresPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateInterest,
        onSuccess(data, variables) {
            if (data?.status === 200) {
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
               ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
               : undefined

               
              if(parsedScheduledTime) {
                queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, variables.uid]})
                onSuccess()
                return
              }

               const updatedInterest = {
                ...data?.data?.result?.data,
                id: data?.data?.result?.id,
                scheduledAt: parsedScheduledTime,
              }

              queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateInterestInCache(cachedData, updatedInterest)
              })
              
              queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, variables.uid]})
            }
            onSuccess()
        },
        onError,
    })
}

export const useDeleteInteresPost = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: deleteInterest,
      onSuccess(data, variables) {
          if (data?.status === 200) {
            queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, variables.id)
              return { ...cachedData, pages: updatedPages }
            })

            queryClient.setQueryData([QueryKeys.USER_INTERESTS, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, variables.id)
              return { ...cachedData, pages: updatedPages }
            })
          }
          onSuccess()
      },
      onError,
  })
}

const updatePageOnDelete = (cachedData: any, postId: string) => {
  const updatedPages = cachedData.pages.map((page: any) => ({
    ...page,
    data: {
      ...page.data,
      result: {
        ...page.data.result,
        interests: page.data.result.interests.filter(
          (interest: any) => interest.id !== postId
        ),
      },
    },
  }))

  return updatedPages
}

const addOrUpdateInterestInCache = (cachedData: any, newInterest: any) => {
  const updatedPages = cachedData.pages.map((page: any, pageIndex: number) => {
    const existingIndex = page.data.result.interests.findIndex((interest: any) => interest.id === newInterest.id);
    if (existingIndex !== -1) {
      const updatedInterests = [...page.data.result.interests];
      updatedInterests[existingIndex] = newInterest;
      return {
        ...page,
        data: {
          ...page.data,
          result: {
            ...page.data.result,
            interests: updatedInterests,
          },
        },
      };
    }
    return page
  })

  const isUpdated = updatedPages.some((page: any) =>
    page.data.result.interests.some((interest: any) => interest.id === newInterest.id)
  )

  if (!isUpdated && updatedPages.length > 0) {
    updatedPages[0] = {
      ...updatedPages[0],
      data: {
        ...updatedPages[0].data,
        result: {
          ...updatedPages[0].data.result,
          interests: [newInterest, ...updatedPages[0].data.result.interests],
        },
      },
    }
  }

  return {
    ...cachedData,
    pages: updatedPages,
  }
}
