import { User } from "@entities/user/types"
import { atom } from "jotai"

export const userList = atom<User[]>([])
