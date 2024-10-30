import { useSelectedPost } from "@features/post/hooks/useSelectedPost"
import { PostActionCell } from "@features/post/ui/PostActionCell"
import { PostTitleCell } from "@features/post/ui/PostTitleCell"
import { PostUserCell } from "@features/post/ui/PostUserCell"
import { useSelectUser } from "@entities/user/hooks/useSelectUser"
import { PostLikeCell } from "@features/post/ui/PostLikeCell"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { usePostRead } from "../hooks/usePostRead"
import { User } from "@entities/user/types"
import React, { useCallback } from "react"
import { TableCell } from "@shared/ui"
import { Post } from "../types"

export const PostsGridBody: React.FC = () => {
  const { updateSelectedPost } = useSelectedPost()
  const { updateSelectedUser } = useSelectUser()
  const { openDialog } = useDialog()
  const { postData } = usePostRead()

  // 유저 모달 열기
  const openUserModal = useCallback(
    (user: User) => {
      updateSelectedUser(user)
      openDialog("detailUser")
    },
    [updateSelectedUser],
  )

  // 포스트 편집 모달 열기
  const openEditDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openDialog("editPost")
    },
    [updateSelectedPost],
  )

  // 포스트 상세 모달 열기
  const openDetailDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openDialog("detailPost")
    },
    [updateSelectedPost],
  )

  // 게시물이 없는 경우
  const hasNotPosts = !postData.posts || postData.posts.length === 0
  if (hasNotPosts) return <div className="p-6">데이터가 없습니다</div>

  return (
    <tbody className="border-t">
      {postData.posts.map((post, index) => (
        <tr key={`${index}th-${post.id}-post-row`}>
          <TableCell>{post.id.toString()}</TableCell>

          <PostTitleCell title={post.title} tags={post.tags} />

          <PostUserCell userId={post.userId} openUserModal={openUserModal} />

          <PostLikeCell reactions={post.reactions} />

          <PostActionCell
            post={post}
            openEditDialog={openEditDialog}
            openPostDetail={openDetailDialog}
          />
        </tr>
      ))}
    </tbody>
  )
}
PostsGridBody.displayName = "PostsGridBody"
