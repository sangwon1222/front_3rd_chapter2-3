import { CreatePostDialog } from "@entities/post/ui/CreatePostDialog"
import { PostEditForm } from "@entities/post/ui/PostEditForm"
import { PostDetail } from "@entities/post/ui/PostDetail"
import { UserDetail } from "@entities/user/ui/UserDetail"
import { CreateComment } from "@entities/comment/ui/CreateComment"
import { EditComment } from "@entities/comment/ui/EditComment"
import { useDialog } from "../hooks/useDialog"
import {
  createCommentDialogAtom,
  createPostDialogAtom,
  editCommentDialogAtom,
  editPostDialogAtom,
  postDetailDialogAtom,
  userDetailDialogAtom,
} from "../model/atom"
import { selectedPostsAtom } from "@entities/post/model/atom"
import { useAtom } from "jotai"

export const DialogWrap = () => {
  const [, setSelectedPost] = useAtom(selectedPostsAtom)
  const { opened: createPostOpen, closeDialog: closeCreatePost } =
    useDialog(createPostDialogAtom)

  const { opened: editPostOpen, closeDialog: closeEditPost } =
    useDialog(editPostDialogAtom)

  const { opened: detailPostOpen, closeDialog: closeDetailPost } =
    useDialog(postDetailDialogAtom)

  const { opened: userOpen, closeDialog: closeUser } =
    useDialog(userDetailDialogAtom)

  const { opened: createCommentOpen, closeDialog: closeCreateComment } =
    useDialog(createCommentDialogAtom)

  const { opened: openEditComment, closeDialog: closeEditComment } = useDialog(
    editCommentDialogAtom,
  )

  const closeDetailPostWithResetSelectedPost = () => {
    setSelectedPost(null)
    closeDetailPost()
  }
  return (
    <>
      {/* 게시물 추가 팝업 */}
      {createPostOpen && (
        <CreatePostDialog userId={1} closeDialog={closeCreatePost} />
      )}

      {/* 게시물 편집 팝업 */}
      {editPostOpen && <PostEditForm closeDialog={closeEditPost} />}

      {/* 게시물 상세 팝업 */}
      {detailPostOpen && (
        <PostDetail
          opened={detailPostOpen}
          closeDialog={closeDetailPostWithResetSelectedPost}
        />
      )}

      {/* 유저 상세정보 팝업 */}
      {userOpen && <UserDetail closeDialog={closeUser} />}

      {/* 댓글 추가 */}
      {createCommentOpen && <CreateComment closeDialog={closeCreateComment} />}

      {/* 댓글 편집 */}
      {openEditComment && <EditComment closeDialog={closeEditComment} />}
    </>
  )
}
