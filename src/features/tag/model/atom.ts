import { Tag } from "@entities/tag/types"
import { atom } from "jotai"

export const tagListAtom = atom<Tag[]>([])
