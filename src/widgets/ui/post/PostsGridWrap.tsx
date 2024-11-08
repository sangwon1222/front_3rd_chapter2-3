import { PostPagination } from "@features/post/ui/PostPagination"
import { usePostRead } from "@features/post/api/usePostRead"
import { PostSearch } from "@features/post/ui/PostSearch"
import { TableWrap } from "@shared/ui"
import { PostGrid } from "@widgets/ui/post/PostGrid"

export const PostsGridWrap: React.FC = () => {
  const { postData, isPostsLoading } = usePostRead()

  return (
    <TableWrap>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostSearch />

        {/* 게시물 테이블 */}
        <PostGrid isLoading={isPostsLoading} posts={postData.posts} />

        {/* 페이지네이션 */}
        <PostPagination total={postData.total} />
      </div>
    </TableWrap>
  )
}
