import { Tag } from "@features/tag/types"
import { atom } from "jotai"

export const tagListAtom = atom<Tag[]>([])
