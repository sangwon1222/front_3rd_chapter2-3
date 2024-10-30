import { Post, PostForm } from "@entities/post/types"

// 게시물 생성
export const createPostApi = async (newPost: PostForm): Promise<Post> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })

    return (await response.json()) as Post
  } catch (e) {
    throw new Error("Failed to add post" + e)
  }
}
