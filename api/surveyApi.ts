import { ImageSizes, SurveyPageData } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Get Survey
export type SurveyProps = {
    uid: string
    isFeedback: boolean
}

export const getSurvey = async ({isFeedback}: SurveyProps) => {
    const data = { isFeedback }
    return axios.post('/getUserUnsubmittedFormsHandler', { data })
}

export type UpdateSurveyProps = {
    uid: string
    id: string
    title: string
    pages: SurveyPageData[]
    isFeedback: boolean
}

export const updateSurvey = async ({id, title, pages, isFeedback}: UpdateSurveyProps) => {
    const data = { id, title, pages, isFeedback }
    console.log('data: ',JSON.stringify(data))
    return axios.post('/submitFormHandler', { data })
}

