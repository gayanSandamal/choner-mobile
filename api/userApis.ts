import { getAxios } from "@/utils/AxiosUtils"
import * as SecureStore from 'expo-secure-store'

const axios = getAxios(true)

// Get user
export const getUser = async () => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    return axios.post(`/getUser`, {
        data: {
            uid: uid
        }
    })
}

// Get user
type SetUserProps = {
    uid: string
    displayName?: string
    profileImageUrl?: string
    professionalIn?: string

}
export const setUser = async ({displayName, profileImageUrl, professionalIn}: SetUserProps) => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    const data = {
        uid,
        ...(displayName !== undefined && { displayName }),
        ...(profileImageUrl !== undefined && { profileImageUrl }),
        ...(professionalIn !== undefined && { professionalIn }),
      }

    return axios.post(`/setUser`, { data })
}