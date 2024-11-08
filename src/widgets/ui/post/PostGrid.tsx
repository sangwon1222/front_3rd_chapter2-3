import { Post } from "@entities/post/types"
import { PostsGridBody } from "@widgets/ui/post/PostsGridBody"
import { PostsGridHeader } from "@widgets/ui/post/PostsGridHeader"

type PropsType = {
  isLoading: boolean
  posts: Post[]
}

export const PostGrid: React.FC<PropsType> = ({ isLoading, posts }) => {
  const hasNotPosts = !posts || posts.length === 0

  if (isLoading || hasNotPosts)
    return (
      <div className="flex flex-col items-center p-16">
        <span>{isLoading ? "로딩 중..." : "데이터가 없습니다"}</span>
      </div>
    )

  return (
    <div className="w-full overflow-auto">
      <table className="table-fixed w-full caption-bottom text-sm">
        <PostsGridHeader />
        <PostsGridBody posts={posts} />
      </table>
    </div>
  )
}
