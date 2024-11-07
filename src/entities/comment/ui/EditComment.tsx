import { useCommentUpdate } from "@entities/comment/hooks/useCommentUpdate"
import { useCommentForm } from "@entities/comment/hooks/useCommentForm"
import { DEFAULT_COMMENT_FORM } from "@entities/comment/constants"
import { selectedCommentAtom } from "../model/atom"
import { Comment } from "@entities/comment/types"
import { useCallback, useEffect } from "react"
import { Button } from "@shared/ui/button"
import { useAtomValue } from "jotai"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
} from "@shared/ui"

export const EditComment: React.FC<{ closeDialog: () => void }> = ({
  closeDialog,
}) => {
  const { updateComment } = useCommentUpdate()
  const selectedComment = useAtomValue(selectedCommentAtom)

  const { commentForm, updateCommentForm } = useCommentForm({
    ...DEFAULT_COMMENT_FORM,
  })

  /** 기존 댓글 textarea 세팅 */
  useEffect(() => {
    console.log(selectedComment, commentForm)
    updateCommentForm({
      postId: selectedComment.id,
      body: selectedComment.body,
    })
  }, [selectedComment])

  /**팝업닫기 */
  const submitComment = useCallback(() => {
    updateComment({ ...selectedComment, ...commentForm } as Comment)

    closeDialog()
  }, [commentForm])

  return (
    <Dialog open={true} onOpenChange={() => closeDialog()}>
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
