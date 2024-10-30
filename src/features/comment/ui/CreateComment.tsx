import { useCommentCreate } from "@features/comment/hooks/useCommentCreate"
import { useSelectedPost } from "@features/post/hooks/useSelectedPost"
import { DEFAULT_COMMENT_DATA } from "@shared/constants/comment"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { useCommentForm } from "./useCommentForm"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
} from "@shared/ui"

export const CreateComment: React.FC = () => {
  const { createComment } = useCommentCreate()
  const { selectedPost } = useSelectedPost()
  const { openCreateComment, closeDialog } = useDialog()
  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({
    ...DEFAULT_COMMENT_DATA,
  })

  useEffect(() => {
    updateCommentForm({ postId: selectedPost.id })
  }, [selectedPost])

  const submitComment = useCallback(() => {
    createComment(commentForm)
    closeDialog("createComment")
    resetCommentForm()
  }, [commentForm])

  return (
    <Dialog
      open={openCreateComment}
      onOpenChange={() => closeDialog("createComment")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={commentForm.body}
            onChange={(e) =>
              updateCommentForm({
                body: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Button onClick={submitComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
