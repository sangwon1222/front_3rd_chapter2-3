import { Button } from "@shared/ui/button"
import { DefaultProps } from "@shared/types"
import { Plus } from "lucide-react"

interface PropsType extends DefaultProps {
  setShowAddDialog: (v: boolean) => void
}

export const PostsHeader: React.FC<PropsType> = ({
  setShowAddDialog,
  className = "",
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      <div className="flex items-center justify-between text-2xl font-semibold leading-none tracking-tight">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </div>
    </div>
  )
}
PostsHeader.displayName = "CardHeader"
