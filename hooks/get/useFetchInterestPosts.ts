import { getInterests } from "@/api/interestPostApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useQuery } from "@tanstack/react-query"

export const useFetchInterestPosts = (uid: string, enabled = true) => {
    return useQuery({
        enabled: enabled,
        queryKey: [QueryKeys.INTERESTS, uid],
        queryFn: getInterests,
        select(data) {
            if (!data?.data?.result) return undefined
            return data?.data?.result
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}