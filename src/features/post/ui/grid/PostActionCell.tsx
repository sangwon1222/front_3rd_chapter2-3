import { Post } from "@shared/types/posts"
import { TableCell } from "@shared/ui"
import { Button } from "@shared/ui/button"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"

type PropsType = {
  post: Post
  deletePost: (id: number) => Promise<void>
  openEditDialog: (post: Post) => void
  openPostDetail: (post: Post) => void
}

export const PostActionCell: React.FC<PropsType> = ({
  post,
  deletePost,
  openEditDialog,
  openPostDetail,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
