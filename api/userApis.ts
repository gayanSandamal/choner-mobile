import { getAxios } from "@/utils/AxiosUtils"
import * as SecureStore from 'expo-secure-store'

const axios = getAxios(true)

// Get user
export const getUser = async () => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    return axios.post(`/getUserHandler`, {
        data: {
            uid: uid
        }
    })
}

// Get user
type SetUserProps = {
    uid: string
    displayName?: string
    bio?: string
    profileImageUrl?: string
}

export const setUser = async ({displayName, profileImageUrl, bio}: SetUserProps) => {
    const session = await SecureStore.getItemAsync('session')

    if (!session) return null

    const uid = JSON.parse(session)?.uid

    const data = {
        uid,
        ...(displayName !== undefined && { displayName }),
        ...(profileImageUrl !== undefined && { profileImageUrl }),
        ...(bio !== undefined && { bio })
      }

    return axios.post(`/setUserHandler`, { data })
}

// Delete user
type DeleteUserProps = {
    userId: string
}

export const deleteUser = async (props: DeleteUserProps) => {
    return axios.post(`/deleteUserHandler`, {
        data: {
            uid: props.userId 
        }
    })
}
