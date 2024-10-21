import { getCommunityPosts, getUserCommunityPosts } from "@/api/communityPostApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchCommunityPosts = (uid: string, type: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.COMMUNITY, type, uid],
        queryFn: ({pageParam}) => getCommunityPosts({type, lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.communityPosts)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}

export const useFetchUserCommunityPosts = (visibility: string, uid: string, type: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.USER_COMMUNITY, type, visibility, uid],
        queryFn: ({pageParam}) => getUserCommunityPosts({visibility, uid, type, lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.communityPosts)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}