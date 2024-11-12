import { getSurvey } from "@/api/surveyApi"
import { DURATIONS, QueryKeys } from "@/constants/values"
import { CompletedForm } from "@/types/Components"
import { useQuery } from "@tanstack/react-query"

export const useFetchSurvey = (uid: string, isFeedback: boolean, enabled = true) => {
    return useQuery({
        enabled: enabled,
        queryKey: [QueryKeys.FEEDBACK, `${isFeedback}`, uid],
        queryFn: () => getSurvey({uid, isFeedback}),
        select(data) {

            if (!data?.data?.result?.data) return undefined
            if (data?.data?.result?.data?.length === 0) return 'completed'
            const survey = addCompletedForms(data?.data?.result?.data[0])
            return survey
        },
        gcTime: isFeedback? 0: DURATIONS.DAY
    })
}

function addCompletedForms(survey: any) {
    const completedForms = survey.questions.map((question: any) => {
      // Default completed form structure
      const completedForm = { pageId: question.id } as CompletedForm
  
      if (question.type === 'radio') {
        completedForm.optionIds = []
      } else if (question.type === 'textarea') {
        completedForm.text = ''
      }
  
      return completedForm
    })
    survey.completedForms = completedForms
    return survey
}