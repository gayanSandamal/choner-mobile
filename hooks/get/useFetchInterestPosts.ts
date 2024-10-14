import { getInterests } from "@/api/interestPostApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchInterestPosts = (isUserFetch: boolean, uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [isUserFetch ? QueryKeys.USER_INTERESTS: QueryKeys.INTERESTS, uid],
        queryFn: ({pageParam}) => getInterests({isUser: isUserFetch, lastPostId: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result.interests)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}