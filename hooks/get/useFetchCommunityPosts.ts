import { getCommunityPosts } from "@/api/communityPostApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchCommunityPosts = (isUserFetch: boolean, uid: string, type: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [isUserFetch ? QueryKeys.USER_COMMUNITY: QueryKeys.COMMUNITY, type, uid],
        queryFn: ({pageParam}) => getCommunityPosts({uid, type, isUser: isUserFetch, lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.communityPosts)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}