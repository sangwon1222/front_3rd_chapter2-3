import { usePostUpdate } from "@entities/post/hooks/usePostUpdate"
import { usePostForm } from "@entities/post/hooks/usePostForm"
import { selectedPostsAtom } from "@entities/post/model/atom"
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

export const PostEditForm: React.FC<{
  closeDialog: () => void
}> = ({ closeDialog }) => {
  const selectedPost = useAtomValue(selectedPostsAtom)
  const { updatePost } = usePostUpdate()

  const { postForm, updatePostForm } = usePostForm({
    ...selectedPost,
  })

  const submitUpdatePostForm = useCallback(async () => {
    const updated = !deepEqual(postForm, selectedPost)
    if (updated) updatePost({ ...(postForm as Post) })

    closeDialog()
  }, [postForm])

  return (
    <Dialog open={true} onOpenChange={() => closeDialog()}>
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
