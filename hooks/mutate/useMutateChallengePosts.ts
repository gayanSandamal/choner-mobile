import { createChallengePost } from "@/api/challengePostApi"
import { createCommunityPost, deleteCommunityPost, updateCommunityPost } from "@/api/communityPostApi"
import { QueryKeys } from "@/constants/values"
import { CommunityCardData } from "@/types/Components"
import { addOrUpdateItemsInCache, isoDateTimeToSecond, parseToCommunityCardProps } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateChallengePost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createChallengePost,
        async onSuccess(data, variables) {
            if (data?.status === 200) {
              const newChallenge = data?.data?.result?.data

              const existingUserCache = await queryClient.getQueryData([QueryKeys.USER_CHALLENGES, variables.uid])
              const existingAllCache = await queryClient.getQueryData([QueryKeys.CHALLENGES, variables.uid])

              if (!existingUserCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.USER_CHALLENGES, variables.uid]})
              } else {
                await queryClient.setQueryData([QueryKeys.USER_CHALLENGES, variables.uid], (cachedData: any) => {
                    if (!cachedData) return cachedData
                    return addOrUpdateItemsInCache(cachedData, newChallenge, 'challenges')
                })
              }

              if (!existingAllCache) {
                await queryClient.invalidateQueries({queryKey: [QueryKeys.CHALLENGES, variables.uid]})
                onSuccess()
                return
              }

              await queryClient.setQueryData([QueryKeys.CHALLENGES, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData
                return addOrUpdateItemsInCache(cachedData, newChallenge, 'challenges')
              })
              onSuccess()
            }
        },
        onError,
    })
}