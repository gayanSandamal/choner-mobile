import { getComments, getReplies } from "@/api/commentsApi"
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

export const useFetchReplies = (postId: string, commentId: string, type: string, uid: string, enabled = true) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.REPLIES, postId, commentId, type, uid],
        queryFn: ({pageParam}) => getReplies({commentId, type, lastVisible: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage.data.result?.hasMore ? lastPage?.data.result?.lastVisible : undefined),
        select(data) {
            if (!data?.pages) return undefined
            if (data?.pages?.length === 0) return []
            return [{replies: data?.pages.map((page) => page?.data?.result?.replies)?.flat(), hasMore: data?.pages[data?.pages?.length - 1]?.data?.result?.hasMore}]
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}