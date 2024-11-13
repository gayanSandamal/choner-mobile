import { ImageSizes, LocationData } from "@/types/Components"
import { getAxios } from "@/utils/AxiosUtils"

const axios = getAxios(true)

// Create Get Dashboard data
export type GetDashboardDataProps = {
    userId: string
}

export const getDashboardData = async ({userId}: GetDashboardDataProps) => {
    const data = { userId }
    return axios.post('/getDashboardDataHandler', { data })
}