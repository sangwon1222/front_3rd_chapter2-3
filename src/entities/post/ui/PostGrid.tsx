import { PostsGridHeader } from "@entities/post/ui/PostsGridHeader"
import { PostsGridBody } from "@entities/post/ui/PostsGridBody"

export const PostGrid: React.FC = () => {
  return (
    <div className="w-full overflow-auto">
      <table className="table-fixed w-full caption-bottom text-sm">
        <PostsGridHeader />
        <PostsGridBody />
      </table>
    </div>
  )
}
