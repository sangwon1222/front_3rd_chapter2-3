import { DeleteCommentBtn } from "@features/comment/ui/DeleteCommentBtn"
import { useCommentRead } from "@features/comment/hooks/useCommentRead"
import { LikeCommentBtn } from "@features/comment/ui/LikeCommentBtn"
import { EditCommentBtn } from "@features/comment/ui/EditCommentBtn"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { highlightText } from "@shared/utils/highlightText"
import { Comment } from "@features/comment/types"
import { Button } from "@shared/ui/button"
import { Plus } from "lucide-react"

type PropsType = {
  postId: number
  searchQuery: string
}
export const CommentBox: React.FC<PropsType> = ({ postId, searchQuery }) => {
  const { openDialog } = useDialog()
  const { comments } = useCommentRead(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => openDialog("createComment")}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment: Comment, index: number) => (
          <div
            key={`${index}th-${comment.id}-${comment.user.id}`}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate min-w-[64px]">
                {comment.user.username}:
              </span>
              <span className="truncate">
                {highlightText(comment.body, searchQuery)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <LikeCommentBtn comment={comment} />
              <EditCommentBtn comment={comment} />
              <DeleteCommentBtn commentId={comment.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
