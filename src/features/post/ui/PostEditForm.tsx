import { usePostUpdate } from "@entities/post/hooks/usePostUpdate"
import { usePostForm } from "@features/post/hooks/usePostForm"
import { selectedPostsAtom } from "@features/post/model/atom"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { deepEqual } from "@shared/utils/deepEqual"
import { Post } from "@entities/post/types"
import { Button } from "@shared/ui/button"
import { useAtomValue } from "jotai"
import { useCallback } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
  Input,
} from "@shared/ui"

export const PostEditForm: React.FC = () => {
  const selectedPost = useAtomValue(selectedPostsAtom)
  const { openEditPost, closeDialog } = useDialog()
  const { updatePost } = usePostUpdate()

  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    openEditPost,
    { ...selectedPost },
  )

  const submitUpdatePostForm = useCallback(async () => {
    const updated = !deepEqual(postForm, selectedPost)
    if (updated) updatePost({ ...(postForm as Post) })

    resetPostForm()
    closeDialog("editPost")
  }, [postForm])

  return (
    <Dialog open={openEditPost} onOpenChange={() => closeDialog("editPost")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => updatePostForm({ title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) =>
              updatePostForm({ body: (e.target as HTMLTextAreaElement).value })
            }
          />
          <Button onClick={submitUpdatePostForm}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
