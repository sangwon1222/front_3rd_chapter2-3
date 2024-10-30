import { DEFAULT_USER_DATA } from "@shared/constants/user"
import { User } from "@entities/user/types"
import { useMemo, useState } from "react"

export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User>({
    ...DEFAULT_USER_DATA,
  })

  const updateSelectedUser = (user: User) => setSelectedUser(user)

  const resetUser = () => setSelectedUser({ ...DEFAULT_USER_DATA })

  return {
    selectedUser: useMemo(() => selectedUser, [selectedUser]),
    updateSelectedUser,
    resetUser,
  }
}
