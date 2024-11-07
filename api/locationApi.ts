import axios from "axios"

type FetchLocations = {
    textQuery: string
    pageToken?: string
}
export const fetchLocations = async ({textQuery, pageToken}: FetchLocations) => {
    const url = 'https://places.googleapis.com/v1/places:searchText'
  
    const requestBody = {
      textQuery,
      pageSize: 20,
      pageToken,
    }

    const key = process.env.EXPO_PUBLIC_MAP_API_KEY
  
    return await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': `${key}`,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,nextPageToken',
        },
      })
  }