import { getDashboardData } from "@/api/dashboardApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { useQuery } from "@tanstack/react-query"

export const useFetchDashboardData = (userId: string, enabled = true) => {
    return useQuery({
        enabled: enabled,
        queryKey: [QueryKeys.DASHBOARD, userId],
        queryFn: () => getDashboardData({userId}),
        select(data) {
            if (!data?.data?.result) return undefined
            return data?.data?.result
        },
        gcTime: DURATIONS.FIVE_MINUTES
    })
}
