import { createInterest } from "@/api/interestPostApi"
import { updateSurvey } from "@/api/surveyApi"
import { POST_VISIBILITY, QueryKeys } from "@/constants/values"
import { isoDateTimeToSecond } from "@/utils/commonUtils"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateSurvey = (onSuccess: () => void, onError: (error: Error) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateSurvey,
        async onSuccess(data, variables) {
            if (data?.status === 200) {
            queryClient.invalidateQueries({queryKey: [QueryKeys.FEEDBACK, `${variables.isFeedback}`, variables.uid]})
            onSuccess()
        }
        },
        onError,
    })
}