import { CreatePostDialog } from "@features/post/ui/CreatePostDialog"
import { CreateComment } from "@features/comment/ui/CreateComment"
import { EditComment } from "@features/comment/ui/EditComment"
import { PostEditForm } from "@features/post/ui/PostEditForm"
import { PostDetail } from "@features/post/ui/PostDetail"
import { UserDetail } from "@features/user/ui/UserDetail"

export const DialogWrap = () => {
  return (
    <>
      {/* 게시물 추가 팝업 */}
      <CreatePostDialog userId={1} />

      {/* 게시물 편집 팝업 */}
      <PostEditForm />

      {/* 게시물 상세 팝업 */}
      <PostDetail />

      {/* 유저 상세정보 팝업 */}
      <UserDetail />

      {/* 댓글 추가 */}
      <CreateComment />

      {/* 댓글 편집 */}
      <EditComment />
    </>
  )
}
