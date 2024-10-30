import { useSelectedComment } from "@features/comment/hooks/useSelectedComment"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { Comment } from "@features/comment/types"
import { Button } from "@shared/ui/button"
import { Edit2 } from "lucide-react"
import { useEffect } from "react"

export const EditCommentBtn: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { openDialog } = useDialog()
  const { updateSelectedComment } = useSelectedComment()

  useEffect(() => {
    updateSelectedComment(comment)
  }, [comment])

  return (
    <Button variant="ghost" size="sm" onClick={() => openDialog("editComment")}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
