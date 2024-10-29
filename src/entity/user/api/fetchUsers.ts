import { User } from "@shared/types/user"

export const fetchUserListApi = async (): Promise<{
  ok: boolean
  data: { limit: number; skip: number; total: number; users: User[] } | null
}> => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return { ok: true, data }
  } catch (e) {
    console.error("전체 유저 정보 가져오기 error", e)
    return { ok: false, data: null }
  }
}

export const fetchUserApi = async (
  id: number,
): Promise<{ ok: boolean; data: User | null }> => {
  try {
    const response = await fetch(`/api/users/${id}`)
    const data = (await response.json()) as User
    return { ok: true, data }
  } catch (e) {
    console.error("유저정보 가져오기 error", e)
    return { ok: false, data: null }
  }
}
