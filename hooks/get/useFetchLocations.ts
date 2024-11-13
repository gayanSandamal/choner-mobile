import { fetchLocations } from "@/api/locationApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useFetchLocations = (uid: string, textQuery: string, enabled = false) => {
    return useInfiniteQuery({
        enabled: enabled,
        initialPageParam: undefined,
        queryKey: [QueryKeys.SEARCH_LOCATION, uid, textQuery.replace(' ', '_')],
        queryFn: ({pageParam}) => fetchLocations({textQuery, pageToken: pageParam}),
        getNextPageParam: (lastPage) => (lastPage && lastPage?.data?.nextPageToken ? lastPage?.data?.nextPageToken : undefined),
        select(data) {
            if (!data?.pages) return undefined
            return data?.pages.map((page) => JSON.parse(page.request._response).places)?.flat()
        },
        gcTime: DURATIONS.SECOND * 10
    })
}