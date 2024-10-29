import { PostsGridHeader } from "@entity/post/ui/grid/PostsGridHeader"
import { PostsGridBody } from "@entity/post/ui/grid/PostsGridBody"
import { Post, PostWithUser } from "@shared/types/posts"
import { SearchParams } from "@entity/post/types/searchParams"

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

export const PostGrid: React.FC<PropsType> = ({
  posts,
  searchQuery,
  selectedTag,
  updateSearchParams,
  deletePost,
  updateSelectedPost,
  setShowEditDialog,
  setShowPostDetailDialog,
}) => {
  const hasNotPosts = !posts || posts.length === 0
  if (hasNotPosts) return <div className="p-6">데이터가 없습니다</div>

  return (
    <div className="w-full overflow-auto">
      <table className="table-fixed w-full caption-bottom text-sm">
        <PostsGridHeader />
        <PostsGridBody
          posts={posts}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          updateSearchParams={updateSearchParams}
          deletePost={deletePost}
          updateSelectedPost={updateSelectedPost}
          setShowEditDialog={setShowEditDialog}
          setShowPostDetailDialog={setShowPostDetailDialog}
        />
      </table>
    </div>
  )
}
