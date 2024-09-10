import { getUser } from "@/api/userApis"
import { QueryKeys } from "@/constants/values"
import { User } from "@/types/User"
import { replaceNullUndefined } from "@/utils/commonUtils"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = (uid: string, enabled = true) => {
    return useQuery({
        enabled: enabled,
        queryKey: [QueryKeys.USER, uid],
        queryFn: getUser,
        select(response) {
            return response?.data?.result?.uid ? replaceNullUndefined(response?.data?.result) as User : null
        },
    })
}