import { atom } from "jotai"
import { Post } from "../types"

export const postsAtom = atom<Post[]>([])

export const selectedPostsAtom = atom<Post | null>(null)
