import { PostPagination } from "@features/post/ui/pagination/PostPagination"
import { PostSearch } from "@features/post/ui/search/PostSearch"
import { SearchParams } from "@entity/post/types/searchParams"
import { PostGrid } from "@entity/post/ui/grid/PostGrid"
import { Post, PostWithUser } from "@shared/types/posts"
import { Loading } from "@shared/ui/loading"
import { TableWrap } from "@shared/ui"
import { useTags } from "@features/post/hooks/useTags"

type PropsType = {
  posts: PostWithUser[]
  searchParams: SearchParams
  loading: boolean
  total: number
  updateSearchParams: (update: Partial<SearchParams>) => void
  searchPosts: (v: string, limit: number) => Promise<void>
  deletePost: (id: number) => Promise<void>
  goNextPage: () => void
  goPrevPage: () => void
  updateSelectedPost: (post: Post) => void
  setShowEditDialog: (v: boolean) => void
  setShowPostDetailDialog: (v: boolean) => void
}

export const PostsGridController: React.FC<PropsType> = ({
  searchParams,
  loading,
  posts,
  total,
  updateSearchParams,
  deletePost,
  searchPosts,
  goNextPage,
  goPrevPage,
  updateSelectedPost,
  setShowEditDialog,
  setShowPostDetailDialog,
}) => {
  const { tags } = useTags()
  return (
    <TableWrap>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostSearch
          searchParams={searchParams}
          updateSearchParams={updateSearchParams}
          searchPosts={searchPosts}
          tags={tags}
        />

        {/* 게시물 테이블 */}
        {loading ? (
          <Loading />
        ) : (
          <PostGrid
            posts={posts}
            searchQuery={searchParams.q}
            selectedTag={searchParams.selectedTag}
            updateSearchParams={updateSearchParams}
            deletePost={deletePost}
            updateSelectedPost={updateSelectedPost}
            setShowEditDialog={setShowEditDialog}
            setShowPostDetailDialog={setShowPostDetailDialog}
          />
        )}

        {/* 페이지네이션 */}
        <PostPagination
          limit={searchParams.limit}
          skip={searchParams.skip}
          total={total}
          updateSearchParams={updateSearchParams}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      </div>
    </TableWrap>
  )
}
