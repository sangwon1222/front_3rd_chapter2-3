/* eslint-disable react-hooks/exhaustive-deps */
import { useSelectedPost } from "@features/post/api/useSelectedPost"
import { PostActionCell } from "@features/post/ui/PostActionCell"
import { PostTitleCell } from "@features/post/ui/PostTitleCell"
import { PostUserCell } from "@features/post/ui/PostUserCell"
import { User } from "@entities/user/types"
import React, { useCallback } from "react"
import { TableCell } from "@shared/ui"
import { Post } from "@entities/post/types"
import { useAtom } from "jotai"
import { selectedUserAtom } from "@features/user/model/atom"
import {
  editPostDialogAtom,
  postDetailDialogAtom,
  userDetailDialogAtom,
} from "@features/dialog/model/atom"
import { useDialog } from "@features/dialog/hooks/useDialog"
import { PostLikeCell } from "@widgets/ui/post/PostLikeCell"

export const PostsGridBody: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const { updateSelectedPost } = useSelectedPost()
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  const { openDialog: openUserDetail } = useDialog(userDetailDialogAtom)
  const { openDialog: openEditPost } = useDialog(editPostDialogAtom)
  const { openDialog: openPostDetail } = useDialog(postDetailDialogAtom)

  // 유저 모달 열기
  const openUserModal = useCallback(
    (user: User) => {
      setSelectedUser(user)
      openUserDetail()
    },
    [selectedUser],
  )

  // 포스트 편집 모달 열기
  const openEditDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openEditPost()
    },
    [updateSelectedPost],
  )

  // 포스트 상세 모달 열기
  const openDetailDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openPostDetail()
    },
    [updateSelectedPost],
  )
  return (
    <tbody className="border-t">
      {posts.map((post, index) => (
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
