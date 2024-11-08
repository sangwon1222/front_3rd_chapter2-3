import { useSelectedComment } from "@features/comment/api/useSelectedComment"
import { Comment } from "@entities/comment/types"
import { Button } from "@shared/ui/button"
import { Edit2 } from "lucide-react"
import { editCommentDialogAtom } from "@features/dialog/model/atom"
import { useDialog } from "@features/dialog/hooks/useDialog"

export const EditCommentBtn: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { openDialog: openEditComment } = useDialog(editCommentDialogAtom)
  const { updateSelectedComment } = useSelectedComment()

  const openEditWithSelectComment = () => {
    updateSelectedComment(comment)
    openEditComment()
  }

  return (
    <Button variant="ghost" size="sm" onClick={openEditWithSelectComment}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
