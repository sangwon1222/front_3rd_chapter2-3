import { useState } from "react"
import { PostsWrap } from "@shared/ui"
import { PostsHeader } from "@entity/post/ui/PostsHeader"
// import { useComments } from "@entity/post/hooks/useComments"
import { usePosts } from "@entity/post/hooks/usePosts"
// import { useCommentForm } from "@features/post/hooks/useCommentForm"
import { PostsGridController } from "@entity/post/ui/grid/PostsGridController"
import { useSearchParams } from "@entity/post/hooks/useSearchParams"
import { useUserCache } from "@entity/user/hooks/useUserCache"
import { NewPostForm } from "@features/post/ui/form/NewPostForm"
import { PostEditForm } from "@features/post/ui/form/PostEditForm"
import { PostDetail } from "@features/post/ui/form/PostDetail"

const PostsManager = () => {
  // const { comments, fetchComments, deleteComment, increaseLikeComment } =
  //   useComments()

  // const { updateCommentForm } = useCommentForm({
  //   userId: -1,
  //   postId: -1,
  //   body: "",
  // })
  useUserCache()

  const { searchParams, updateSearchParams, goNextPage, goPrevPage } =
    useSearchParams({
      skip: 0,
      limit: 10,
      q: "",
      sortBy: "",
      sortOrder: "asc",
      selectedTag: "",
    })

  const {
    posts,
    total,
    selectedPost,
    postsLoading,
    addPost,
    updatePost,
    deletePost,
    // fetchPosts,
    searchPosts,
    updateSelectedPost,
  } = usePosts(searchParams)

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  return (
    <PostsWrap className="w-full max-w-6xl mx-auto">
      <PostsHeader setShowAddDialog={setShowAddDialog} />

      <PostsGridController
        posts={posts}
        searchParams={searchParams}
        loading={postsLoading}
        total={total}
        updateSearchParams={updateSearchParams}
        deletePost={deletePost}
        searchPosts={searchPosts}
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
        updateSelectedPost={updateSelectedPost}
        setShowEditDialog={setShowEditDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
      />

      <NewPostForm
        userId={1}
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        addPost={addPost}
      />

      <PostEditForm
        selectedPost={selectedPost}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        updatePost={updatePost}
      />

      <PostDetail
        selectedPost={selectedPost}
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        searchQuery={searchParams.q}
      />
    </PostsWrap>
  )
}

export default PostsManager
