import { atom } from "jotai"

export const dialogsAtom = atom<{ [key: string]: boolean }>({
  createPost: false,
  editPost: false,
  detailPost: false,
  detailUser: false,
  createComment: false,
  editComment: false,
})
