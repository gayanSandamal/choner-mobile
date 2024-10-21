import { createCommunityPost } from "@/api/communityPostApi"
import { POST_VISIBILITY, QueryKeys } from "@/constants/values"
import { isoDateTimeToSecond } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateCommunityPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCommunityPost,
        async onSuccess(data, variables) {
            if (data?.status === 200) {
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
              ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
              : undefined

              const newCommunity = {
               ...data?.data?.result?.data,
               id: data?.data?.result?.id,
               scheduledAt: parsedScheduledTime,
              }

              if(parsedScheduledTime) {
                const existUserCache = await queryClient.getQueryData([QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.SCHEDULED, variables.uid])
  
                if (!existUserCache) {
                  await queryClient.invalidateQueries({queryKey: [QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.SCHEDULED, variables.uid]})
                } else {
                  await queryClient.setQueryData([QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.SCHEDULED, variables.uid], (cachedData: any) => {
                    if (!cachedData) return cachedData;
                    return addOrUpdateCommunityInCache(cachedData, newCommunity)
                  })
                }
                onSuccess()
                return
              }

              const existUserCache = await queryClient.getQueryData([QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.PUBLIC, variables.uid])

              if (!existUserCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.PUBLIC, variables.uid]})
              } else {
                await queryClient.setQueryData([QueryKeys.USER_COMMUNITY, variables.type, POST_VISIBILITY.PUBLIC, variables.uid], (cachedData: any) => {
                  if (!cachedData) return cachedData;
                  return addOrUpdateCommunityInCache(cachedData, newCommunity)
                })
              }

              const existingCache = await queryClient.getQueryData([QueryKeys.COMMUNITY, variables.type, variables.uid])

              if (!existingCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.COMMUNITY, variables.type, variables.uid]})
                onSuccess()
                return
              }

              await queryClient.setQueryData([QueryKeys.COMMUNITY, variables.type, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateCommunityInCache(cachedData, newCommunity)
              })
              onSuccess()
            }
        },
        onError,
    })
}

const addOrUpdateCommunityInCache = (cachedData: any, newCommunity: any) => {
  const updatedPages = cachedData.pages.map((page: any, pageIndex: number) => {
    const existingIndex = page.data.result.communityPosts.findIndex((community: any) => community.id === newCommunity.id);
    if (existingIndex !== -1) {
      const updatedCommunity = [...page.data.result.communityPosts];
      updatedCommunity[existingIndex] = newCommunity;
      return {
        ...page,
        data: {
          ...page.data,
          result: {
            ...page.data.result,
            communityPosts: updatedCommunity,
          },
        },
      };
    }
    return page
  })

  const isUpdated = updatedPages.some((page: any) =>
    page.data.result.communityPosts.some((community: any) => community.id === newCommunity.id)
  )

  if (!isUpdated && updatedPages.length > 0) {
    updatedPages[0] = {
      ...updatedPages[0],
      data: {
        ...updatedPages[0].data,
        result: {
          ...updatedPages[0].data.result,
          communityPosts: [newCommunity, ...updatedPages[0].data.result.communityPosts],
        },
      },
    }
  }

  return {
    ...cachedData,
    pages: updatedPages,
  }
}
