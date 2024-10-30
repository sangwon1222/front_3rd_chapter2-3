import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import { searchParamsAtom } from "@features/searchParams/model/atom"
import { selectedPostsAtom } from "@features/post/model/atom"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { highlightText } from "@shared/utils/highlightText"
import { CommentBox } from "@features/comment/ui/CommentBox"
import { useAtomValue } from "jotai"

export const PostDetail: React.FC = () => {
  const { openDetailPost, closeDialog } = useDialog()
  const { q: searchQuery } = useAtomValue(searchParamsAtom)
  const selectedPost = useAtomValue(selectedPostsAtom)

  return (
    <Dialog
      open={openDetailPost}
      onOpenChange={() => closeDialog("detailPost")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost?.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full max-w-md">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>

          {/* 댓글 컴포넌트 */}
          <CommentBox postId={selectedPost?.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
