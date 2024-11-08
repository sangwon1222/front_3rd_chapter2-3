import { atom } from "jotai"
import { Post } from "../../../entities/post/types"

export const postsAtom = atom<Post[]>([])

export const selectedPostsAtom = atom<Post | null>(null)
