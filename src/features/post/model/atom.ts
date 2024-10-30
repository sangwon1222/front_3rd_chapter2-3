import { DEFAULT_POST } from "@shared/constants/post"
import { Post } from "@entities/post/types"
import { atom } from "jotai"

export const selectedPostsAtom = atom<Post>(DEFAULT_POST)
