import { createInterest, deleteInterest, updateInterest } from "@/api/interestPostApi"
import { POST_VISIBILITY, QueryKeys } from "@/constants/values"
import { isoDateTimeToSecond } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateInteresPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createInterest,
        async onSuccess(data, variables) {
            if (data?.status === 200) {                
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
              ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
              : undefined

              
              const newInterest = {
                ...data?.data?.result?.data,
                id: data?.data?.result?.id,
                scheduledAt: parsedScheduledTime,
               }

              if(parsedScheduledTime) {
                const existUserCache = await queryClient.getQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.SCHEDULED, variables.uid])
  
                if (!existUserCache) {
                  await queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, POST_VISIBILITY.SCHEDULED, variables.uid]})
                } else {
                  await queryClient.setQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.SCHEDULED, variables.uid], (cachedData: any) => {
                    if (!cachedData) return cachedData;
                    return addOrUpdateInterestInCache(cachedData, newInterest)
                  })
                }
                onSuccess()
                return
              }

              const existUserCache = await queryClient.getQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.PUBLIC, variables.uid])

              if (!existUserCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.USER_INTERESTS, POST_VISIBILITY.PUBLIC, variables.uid]})
              } else {
                await queryClient.setQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.PUBLIC, variables.uid], (cachedData: any) => {
                  if (!cachedData) return cachedData;
                  return addOrUpdateInterestInCache(cachedData, newInterest)
                })
              }
              
              const existingCache = await queryClient.getQueryData([QueryKeys.INTERESTS, variables.uid])

              if (!existingCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.INTERESTS, variables.uid]})
                onSuccess()
                return
              }

              await queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateInterestInCache(cachedData, newInterest)
              })
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
        async onSuccess(data, variables) {
            if (data?.status === 200) {
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
               ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
               : undefined
               
              if(parsedScheduledTime) {
                await queryClient.setQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.SCHEDULED, variables.uid], (cachedData: any) => {
                  if (!cachedData) return cachedData;
                  return addOrUpdateInterestInCache(cachedData, updatedInterest)
                })
                onSuccess()
                return
              }

               const updatedInterest = {
                ...data?.data?.result?.data,
                id: data?.data?.result?.id,
                scheduledAt: parsedScheduledTime,
              }

              await queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateInterestInCache(cachedData, updatedInterest)
              })
              
              await queryClient.setQueryData([QueryKeys.USER_INTERESTS, POST_VISIBILITY.PUBLIC, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateInterestInCache(cachedData, updatedInterest)
              })
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
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            await queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, variables.id)
              return { ...cachedData, pages: updatedPages }
            })

            await queryClient.setQueryData([QueryKeys.USER_INTERESTS, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, variables.id)
              return { ...cachedData, pages: updatedPages }
            })
            onSuccess()
          }
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
