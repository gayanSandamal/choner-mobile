import { getInterests, getUserInterests, getWhoShowedInterest } from "@/api/interestPostApi"
import { DURATIONS, POST_VISIBILITY, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchInterestPosts = ( uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.INTERESTS, uid],
        queryFn: ({pageParam}) => getInterests({lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result.interests)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}

export const useFetchUserInterestPosts = (visibility: string, uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.USER_INTERESTS, visibility, uid],
        queryFn: ({pageParam}) => getUserInterests({visibility, lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result.interests)?.flat()
        },
        gcTime: DURATIONS.DAY
    })
}

export const useFetchWhoShowedInterest = (uid: string, interestId: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.WHO_SHOWED_INTEREST, uid, interestId],
        queryFn: ({pageParam}) => getWhoShowedInterest({LastUserId: pageParam, interestId, uid}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.data)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}
