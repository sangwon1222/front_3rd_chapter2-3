import { Post, PostForm } from "@shared/types/posts"

// 게시물 가져오기
export const fetchPostsApi = async (queryString: string) => {
  try {
    const response = await fetch(`/api/posts${queryString}`)
    const data = await response.json()

    return { ok: true, data }
  } catch (e) {
    console.error("포스트 가져오기 error", e)
    return { ok: false, data: [] }
  }
}

export const fetchPostsByTagApi = async ({
  tag,
  limit,
  skip,
}: {
  tag: string
  limit: number
  skip: number
}) => {
  try {
    const response = await fetch(
      `/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`,
    )
    const data = await response.json()

    return { ok: true, data }
  } catch (e) {
    console.error("tag로 포스트 가져오기 error", e)
    return { ok: false, data: [] }
  }
}

export const addPostsApi = async (newPost: PostForm) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    return { ok: true, data }
  } catch (e) {
    console.error("포스트 추가 error", e)
    return { ok: false, data: [] }
  }
}

export const updatePostsApi = async (selectedPost: Partial<Post>) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()

    return { ok: true, data }
  } catch (e) {
    console.error("포스트 업데이트 error", e)
    return { ok: false, data: [] }
  }
}

export const deletePostApi = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return { ok: true, data: [] }
  } catch (e) {
    console.error("포스트 삭제 error", e)
    return { ok: false, data: [] }
  }
}

export const searchPostsApi = async (searchQuery: string, limit: number) => {
  try {
    const response = await fetch(
      `/api/posts/search?q=${searchQuery}&limit=${limit}&skip=0`,
    )
    const data = await response.json()

    return { ok: true, data }
  } catch (e) {
    console.error("포스트 검색 error", e)
    return { ok: false, data: [] }
  }
}
