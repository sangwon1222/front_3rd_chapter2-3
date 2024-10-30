import { DEFAULT_COMMENT } from "@shared/constants/comment"
import { Comment } from "@features/comment/types"
import { atom } from "jotai"

export const selectedCommentAtom = atom<Comment>(DEFAULT_COMMENT)
