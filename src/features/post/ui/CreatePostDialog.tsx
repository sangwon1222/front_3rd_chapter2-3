import { usePostCreate } from "@entities/post/hooks/usePostCreate"
import { usePostForm } from "@features/post/hooks/usePostForm"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { PostForm } from "@entities/post/types"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
  Input,
} from "@shared/ui"
import { DEFAULT_POST_FORM } from "@shared/constants/post"

type PropsType = { userId: number }

export const CreatePostDialog: React.FC<PropsType> = ({ userId }) => {
  const { createPost } = usePostCreate()
  const { openCreatePost, closeDialog } = useDialog()
  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    openCreatePost,
    { ...DEFAULT_POST_FORM, userId },
  )

  const submitNewPostForm = useCallback(() => {
    createPost({ ...(postForm as PostForm) })
    resetPostForm()
    closeDialog("createPost")
  }, [postForm])

  return (
    <Dialog
      open={openCreatePost}
      onOpenChange={() => closeDialog("createPost")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => updatePostForm({ title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) =>
              updatePostForm({ body: (e.target as HTMLTextAreaElement).value })
            }
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={postForm.userId}
            onChange={(e) => updatePostForm({ userId: Number(e.target.value) })}
          />
          <Button onClick={submitNewPostForm}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
