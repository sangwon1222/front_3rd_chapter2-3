import { Post, PostWithUser } from "@shared/types/posts"
import React, { useCallback } from "react"
import { TableCell } from "@shared/ui"
import { PostTitleCell } from "@features/post/ui/grid/PostTitleCell"
import { SearchParams } from "@entity/post/types/searchParams"
import { PostUserCell } from "@features/post/ui/grid/PostUserCell"
import { PostLikeCell } from "@features/post/ui/grid/PostLikeCell"
import { PostActionCell } from "@features/post/ui/grid/PostActionCell"

type PropsType = {
  posts: PostWithUser[]
  searchQuery: string
  selectedTag: string
  updateSearchParams: (data: Partial<SearchParams>) => void
  deletePost: (id: number) => Promise<void>
  updateSelectedPost: (post: Post) => void
  setShowEditDialog: (v: boolean) => void
  setShowPostDetailDialog: (v: boolean) => void
}

export const PostsGridBody: React.FC<PropsType> = ({
  posts,
  searchQuery,
  selectedTag,
  updateSearchParams,
  deletePost,
  updateSelectedPost,
  setShowEditDialog,
  setShowPostDetailDialog,
}) => {
  const openEditDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      setShowEditDialog(true)
    },
    [updateSelectedPost, setShowEditDialog],
  )

  const openDetailDialog = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      setShowPostDetailDialog(true)
    },
    [updateSelectedPost, setShowPostDetailDialog],
  )

  return (
    <tbody className="border-t">
      {posts.map((post, index) => (
        <tr key={`${index}th-${post.id}-post-row`}>
          <TableCell>{post.id.toString()}</TableCell>
          <PostTitleCell
            title={post.title}
            searchQuery={searchQuery}
            tags={post.tags}
            selectedTag={selectedTag}
            updateSearchParams={updateSearchParams}
          />
          <PostUserCell
            author={post.author}
            openUserModal={() => console.log("openUserModal")}
          />

          <PostLikeCell reactions={post.reactions} />

          <PostActionCell
            post={post}
            deletePost={deletePost}
            openEditDialog={openEditDialog}
            openPostDetail={openDetailDialog}
          />
        </tr>
      ))}
    </tbody>
  )
}
PostsGridBody.displayName = "PostsGridBody"
