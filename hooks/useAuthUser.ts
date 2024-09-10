
import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'

export const useAuthUserId = () => {
    const [id, setId] = useState<string | null>(null)

    const getSession = useCallback(async () => {
        const session = await SecureStore.getItemAsync('session')

        if (!session) return
        const uid = JSON.parse(session)?.uid
        if (uid !== id) {
            setId(uid)
        }
    }, [id])

    useEffect(() => {
        getSession()
    }, [getSession])

    return id
}