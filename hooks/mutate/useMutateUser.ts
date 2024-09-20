import { setUser } from "@/api/userApis"
import { QueryKeys } from "@/constants/values"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSetUser = (onSuccess: () => void, onError: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: setUser,
        onSuccess(data, variables) {
            if (data?.status === 200) {
                const response: any = queryClient.getQueryData([QueryKeys.USER, variables.uid])

                if (response && response?.data) {
                    const updatedUserData = { ...response?.data?.result, displayName: variables.displayName }
                    response.data = { ...response.data, result: updatedUserData }
                    queryClient.setQueryData([QueryKeys.USER, variables.uid], () => { return response })
                }
            }
            onSuccess()
        },
        onError,
    })
}