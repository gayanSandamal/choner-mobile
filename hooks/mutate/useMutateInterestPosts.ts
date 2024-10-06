import { createInterest } from "@/api/interestPostApi"
import { QueryKeys } from "@/constants/values"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateInteresPost = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createInterest,
        onSuccess(data, variables) {
            if (data?.status === 200) {                
                const response: any = queryClient.getQueryData([QueryKeys.INTERESTS, variables.uid])

                if (response?.data?.result) {                    
                    queryClient.setQueryData([QueryKeys.INTERESTS, variables.uid], () => {
                        return {
                            ...response,
                            data: {
                                ...response.data,
                                result: [data?.data?.result?.data, ...response.data.result]
                            }
                        }
                    })
                }
            }
            onSuccess()
        },
        onError,
    })
}
