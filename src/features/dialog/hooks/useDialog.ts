import { dialogsAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useDialog = () => {
  const [
    {
      createPost,
      editPost,
      detailPost,
      detailUser,
      createComment,
      editComment,
    },
    setDialogs,
  ] = useAtom(dialogsAtom)

  const openDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: true }))
  }

  const closeDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: false }))
  }

  return {
    openCreatePost: createPost,
    openEditPost: editPost,
    openDetailPost: detailPost,
    openDetailUser: detailUser,
    openCreateComment: createComment,
    openEditComment: editComment,
    openDialog,
    closeDialog,
  }
}
