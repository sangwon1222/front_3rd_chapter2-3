import { User } from "./user"

export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: User
}

export interface CommentForm {
  body: string
  postId: number
  userId: number
}
