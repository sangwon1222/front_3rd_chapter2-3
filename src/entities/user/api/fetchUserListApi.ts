import { User } from "@entities/user/types"
import { fetchJson } from "@shared/utils/fetchJson"

export const fetchUserListApi = async (): Promise<User[]> => {
  const { ok, data, error } = await fetchJson("/api/users?limit=0", {})
  if (!ok) throw new Error(error ? error : "Failed to fetch user list data: ")
  return data.users
}
