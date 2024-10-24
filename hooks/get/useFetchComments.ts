import { getComments } from "@/api/commentsApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchCommemnts = (postId: string, uid: string, type: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.COMMENTS, postId, type, uid],
        queryFn: ({pageParam}) => getComments({postId, type, lastVisible: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => page?.data?.result?.comments)?.flat()
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}