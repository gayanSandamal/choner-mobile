import { deleteUser, setUser } from "@/api/userApis"
import { QueryKeys } from "@/constants/values"
import { User } from "@/types/User"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSetUser = (onSuccess: (data: User) => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: setUser,
        onSuccess(data, variables) {
            if (data?.status === 200) {
                const response: any = queryClient.getQueryData([QueryKeys.USER, variables.uid])

                if (response && response?.data) {
                    const updatedUserData = {
                        ...response?.data?.result,
                        displayName: variables?.displayName || response?.data?.result?.displayName,
                        professionalIn: variables?.professionalIn  || response?.data?.result?.professionalIn,
                        profileImageUrl: variables?.profileImageUrl  || response?.data?.result?.profileImageUrl,
                        description: variables?.description || response?.data?.result?.description
                    }
                    response.data = { ...response.data, result: updatedUserData }

                    queryClient.setQueryData([QueryKeys.USER, variables.uid], () => { return response })
                }
            }
            onSuccess(variables as User)
        },
        onError,
    })
}

export const useDeleteUser = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess(data) {
            if (data?.status === 200) {
                queryClient.clear()
                onSuccess()
            }
        },
        onError,
    })
}
