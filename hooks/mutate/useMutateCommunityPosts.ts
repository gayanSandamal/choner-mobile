import { createCommunityPost } from "@/api/communityPostApi"
import { QueryKeys } from "@/constants/values"
import { isoDateTimeToSecond } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateCommunityPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCommunityPost,
        onSuccess(data, variables) {
            if (data?.status === 200) {                
              const parsedScheduledTime = data?.data?.result?.data?.scheduledAt
              ? isoDateTimeToSecond(data?.data?.result?.data?.scheduledAt)
              : undefined

              if(parsedScheduledTime) {
                queryClient.invalidateQueries({queryKey: [QueryKeys.USER_COMMUNITY, variables.uid]})
                onSuccess()
                return
              }

              const newCommunity = {
               ...data?.data?.result?.data,
               id: data?.data?.result?.id,
               scheduledAt: parsedScheduledTime,
              }

              queryClient.setQueryData([QueryKeys.COMMUNITY, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData;
                return addOrUpdateCommunityInCache(cachedData, newCommunity)
              })
              queryClient.invalidateQueries({queryKey: [QueryKeys.USER_COMMUNITY, variables.uid]})
            }
            onSuccess()
        },
        onError,
    })
}

const addOrUpdateCommunityInCache = (cachedData: any, newCommunity: any) => {
  const updatedPages = cachedData.pages.map((page: any, pageIndex: number) => {
    const existingIndex = page.data.result.community.findIndex((community: any) => community.id === newCommunity.id);
    if (existingIndex !== -1) {
      const updatedCommunity = [...page.data.result.community];
      updatedCommunity[existingIndex] = newCommunity;
      return {
        ...page,
        data: {
          ...page.data,
          result: {
            ...page.data.result,
            community: updatedCommunity,
          },
        },
      };
    }
    return page
  })

  const isUpdated = updatedPages.some((page: any) =>
    page.data.result.community.some((community: any) => community.id === newCommunity.id)
  )

  if (!isUpdated && updatedPages.length > 0) {
    updatedPages[0] = {
      ...updatedPages[0],
      data: {
        ...updatedPages[0].data,
        result: {
          ...updatedPages[0].data.result,
          community: [newCommunity, ...updatedPages[0].data.result.community],
        },
      },
    }
  }

  return {
    ...cachedData,
    pages: updatedPages,
  }
}
