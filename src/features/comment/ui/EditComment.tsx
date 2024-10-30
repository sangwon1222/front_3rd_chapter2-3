import { DEFAULT_COMMENT_FORM } from "@shared/constants/comment"
import { useCommentUpdate } from "../hooks/useCommentUpdate"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { useCommentForm } from "./useCommentForm"
import { Comment } from "@features/comment/types"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
} from "@shared/ui"
import { useAtomValue } from "jotai"
import { selectedCommentAtom } from "../model/atom"

export const EditComment: React.FC = () => {
  const { updateComment } = useCommentUpdate()
  const selectedComment = useAtomValue(selectedCommentAtom)
  const { openEditComment, closeDialog } = useDialog()

  const { commentForm, updateCommentForm, resetCommentForm } = useCommentForm({
    ...DEFAULT_COMMENT_FORM,
  })

  /** 기존 댓글 textarea 세팅 */
  useEffect(() => {
    updateCommentForm({
      postId: selectedComment.id,
      body: selectedComment.body,
    })
  }, [selectedComment])

  /**팝업닫기 */
  const submitComment = useCallback(() => {
    updateComment({ ...selectedComment, ...commentForm } as Comment)

    closeDialog("editComment")
    resetCommentForm()
  }, [commentForm])

  return (
    <Dialog
      open={openEditComment}
      onOpenChange={() => closeDialog("editComment")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
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
          <Button onClick={submitComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
