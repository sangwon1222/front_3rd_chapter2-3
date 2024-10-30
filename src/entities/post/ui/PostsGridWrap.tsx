import { PostPagination } from "@features/post/ui/PostPagination"
import { usePostRead } from "@entities/post/hooks/usePostRead"
import { PostSearch } from "@features/post/ui/PostSearch"
import { PostGrid } from "@entities/post/ui/PostGrid"
import { Loading } from "@shared/ui/loading"
import { TableWrap } from "@shared/ui"

export const PostsGridWrap: React.FC = () => {
  const { postData, isPostsLoading } = usePostRead()

  return (
    <TableWrap>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <PostSearch />

        {/* 게시물 테이블 */}
        {isPostsLoading ? <Loading /> : <PostGrid />}

        {/* 페이지네이션 */}
        <PostPagination total={postData.total} />
      </div>
    </TableWrap>
  )
}
