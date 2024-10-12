import { User } from "@/types/User"
import { getAxios } from "@/utils/AxiosUtils"
import * as SecureStore from 'expo-secure-store'

const axios = getAxios(true)

// Get interest posts
type GetInterstsProps = {
}
export const getInterests = async () => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    return axios.post('/getAllInterests', {
        data: {}
    })
}

// Create interest post
export type CreateInterestProps = {
    uid: string
    title: string
    description: string
    scheduledAt?: string
}

export const createInterest = async ({uid, title, description, scheduledAt}: CreateInterestProps) => {
    const data = { uid, title, description, scheduledAt }
    return axios.post('/createInterest', { data })
}
