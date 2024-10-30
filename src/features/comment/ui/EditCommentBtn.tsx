import { Button } from "@shared/ui/button"
import { Edit2 } from "lucide-react"

export const EditCommentBtn: React.FC = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        console.log(`
      setSelectedComment(comment)
      setShowEditCommentDialog(true)`)
      }}
    >
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
