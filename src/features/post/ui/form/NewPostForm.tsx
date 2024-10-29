import { usePostForm } from "@features/post/hooks/usePostForm"
import { PostForm } from "@shared/types/posts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@shared/ui"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"

type PropsType = {
  userId: number
  showAddDialog: boolean
  setShowAddDialog: (v: boolean) => void
  addPost: (v: PostForm) => void
}

export const NewPostForm: React.FC<PropsType> = ({
  userId,
  showAddDialog,
  setShowAddDialog,
  addPost,
}) => {
  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    showAddDialog,
    {
      body: "",
      title: "",
      userId,
    },
  )
  const submitNewPostForm = useCallback(() => {
    addPost({ ...(postForm as PostForm) })
    resetPostForm()
    setShowAddDialog(false)
  }, [postForm])

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => updatePostForm({ title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) =>
              updatePostForm({ body: (e.target as HTMLTextAreaElement).value })
            }
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={postForm.userId}
            onChange={(e) => updatePostForm({ userId: Number(e.target.value) })}
          />
          <Button onClick={submitNewPostForm}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
