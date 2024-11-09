import { bulkApproveRequestedParticipants, createUpdateChallengePost, deleteChallengePost, toggleUserChallengeStatus } from "@/api/challengePostApi"
import { QueryKeys } from "@/constants/values"
import { addOrUpdateItemsInCache, updatePageOnDelete, updatePageOnDeleteList } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateUpdateChallengePost = (onSuccess: (data: any) => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createUpdateChallengePost,
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
                onSuccess(newChallenge)
                return
              }

              await queryClient.setQueryData([QueryKeys.CHALLENGES, variables.uid], (cachedData: any) => {
                if (!cachedData) return cachedData
                return addOrUpdateItemsInCache(cachedData, newChallenge, 'challenges')
              })
              onSuccess(newChallenge)
            }
        },
        onError,
    })
}

export const useToggleUserChallengeStatus = (onSuccess: (data: any) => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: toggleUserChallengeStatus,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            const newChallenge = data?.data?.result?.data

            const existingJoindedCache = await queryClient.getQueryData([QueryKeys.JOINED_CHALLENGES, variables.uid])
            const existingAllCache = await queryClient.getQueryData([QueryKeys.CHALLENGES, variables.uid])

            if (!existingJoindedCache) {
              await queryClient.invalidateQueries({queryKey: [QueryKeys.JOINED_CHALLENGES, variables.uid]})
            } else {
              await queryClient.setQueryData([QueryKeys.JOINED_CHALLENGES, variables.uid], (cachedData: any) => {
                  if (!cachedData) return cachedData
                  return addOrUpdateItemsInCache(cachedData, newChallenge, 'challenges')
              })
            }

            if (!existingAllCache) {
              await queryClient.invalidateQueries({queryKey: [QueryKeys.CHALLENGES, variables.uid]})
              onSuccess(newChallenge)
              return
            }

            await queryClient.setQueryData([QueryKeys.CHALLENGES, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              return addOrUpdateItemsInCache(cachedData, newChallenge, 'challenges')
            })
            onSuccess(newChallenge)
          }
      },
      onError,
  })
}

export const useDeleteChallengePost = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: deleteChallengePost,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            await queryClient.setQueryData([QueryKeys.CHALLENGES, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, 'challenges', variables.challengeId)
              return updatedPages
            })

            await queryClient.setQueryData([QueryKeys.JOINED_CHALLENGES, variables.uid], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDelete(cachedData, 'challenges', variables.challengeId)
              return updatedPages
            })
            onSuccess()
          }
      },
      onError,
  })
}

export const useBulkApproveRequestedParticipants = (onSuccess: (uids: string[]) => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
      mutationFn: bulkApproveRequestedParticipants,
      async onSuccess(data, variables) {
          if (data?.status === 200) {
            await queryClient.setQueryData([QueryKeys.CHALLENGE_PENDING_PRTICIPANTS, variables.uid, variables.challengeId], (cachedData: any) => {
              if (!cachedData) return cachedData
              const updatedPages = updatePageOnDeleteList(cachedData, 'data', variables.uids, 'uid')
              return updatedPages
            })
            onSuccess(variables.uids)
          }
      },
      onError,
  })
}
