import { usePostForm } from "@features/post/hooks/usePostForm"
import { Post } from "@shared/types/posts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@shared/ui"
import { Button } from "@shared/ui/button"
import { deepEqual } from "@shared/utils/deepEqual"
import { useCallback } from "react"

type PropsType = {
  selectedPost: Post
  showEditDialog: boolean
  setShowEditDialog: (v: boolean) => void
  updatePost: (post: Post) => Promise<void>
}

export const PostEditForm: React.FC<PropsType> = ({
  selectedPost,
  showEditDialog,
  setShowEditDialog,
  updatePost,
}) => {
  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    showEditDialog,
    { ...selectedPost },
  )

  const submitUpdatePostForm = useCallback(async () => {
    const updated = !deepEqual(postForm, selectedPost)
    if (updated) await updatePost({ ...(postForm as Post) })

    resetPostForm()
    setShowEditDialog(false)
  }, [postForm])

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
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
