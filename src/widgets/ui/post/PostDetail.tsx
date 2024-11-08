import { searchTextAtom } from "@features/searchParams/model/atom"
import { highlightText } from "@shared/utils/highlightText"
import { useAtomValue } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import { lazy, Suspense } from "react"
import { selectedPostsAtom } from "@features/post/model/atom"

const CommentBox = lazy(() => import("@widgets/ui/comment/CommentBox"))

export const PostDetail: React.FC<{
  opened: boolean
  closeDialog: () => void
}> = ({ opened, closeDialog }) => {
  const searchText = useAtomValue(searchTextAtom)
  const selectedPost = useAtomValue(selectedPostsAtom)

  if (!opened) return null
  if (!selectedPost) return <div>loading</div>
  return (
    <Dialog open={opened} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost?.title, searchText)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full max-w-md">
          <p>{highlightText(selectedPost?.body, searchText)}</p>

          {/* 댓글 컴포넌트 */}
          <Suspense fallback={<div>loading</div>}>
            <CommentBox postId={selectedPost?.id} searchText={searchText} />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}
