import { Post } from "@shared/types/posts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import { highlightText } from "@shared/utils/highlightText"

type PropsType = {
  selectedPost: Post
  searchQuery: string
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (v: boolean) => void
}

export const PostDetail: React.FC<PropsType> = ({
  selectedPost,
  searchQuery,
  showPostDetailDialog,
  setShowPostDetailDialog,
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost?.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {/* 댓글창 컴포넌트 {renderComments(selectedPost?.id)} */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
