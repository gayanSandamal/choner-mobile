import { getChallengePosts, getUserChallengePosts } from "@/api/challengePostApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchChallengePosts = (uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.CHALLENGES, uid],
        queryFn: ({pageParam}) => getChallengePosts({lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.challenges)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}

export const useFetchUserChallengePosts = (uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.USER_CHALLENGES, uid],
        queryFn: ({pageParam}) => getUserChallengePosts({lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.challenges)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}
