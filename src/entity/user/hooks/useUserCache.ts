import { fetchUserApi, fetchUserListApi } from "../api/fetchUsers"
import { useEffect } from "react"
import { userCache } from "../services/userServices"

export const useUserCache = () => {
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { ok, data } = await fetchUserListApi()
    if (!ok) return

    if (data) userCache.setUser(data.users)
  }

  const getUser = async (id: number) => {
    const cacheUser = userCache.getUser(id)
    if (cacheUser) return cacheUser

    const { ok, data } = await fetchUserApi(id)
    if (!ok) return null

    if (data) userCache.updateUser(data)
    return data
  }

  return { userData: [...userCache.users.values()], fetchUsers, getUser }
}
