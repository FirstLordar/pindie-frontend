import { useEffect, useState } from 'react'
import { getNormalizedGamesDataByCategory } from './api-utils'
import { isResponseOk } from "@/app/api/api-utils";

export const useGetDataByCategory = (endpoint, category) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getNormalizedGamesDataByCategory(endpoint, category)
      console.log (data)
      if (isResponseOk(data)) {
        setData(data)
      }
    }
    fetchData()
  }, [])
  return data
}
