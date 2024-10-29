import { Post, PostForm, PostWithUser } from "@shared/types/posts"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  addPostsApi,
  deletePostApi,
  fetchPostsApi,
  searchPostsApi,
  updatePostsApi,
} from "@entity/post/api/fetchPosts"
import { joinUserData, userCache } from "@entity/user/services/userServices"
import { withLoading } from "@shared/utils/withLoading"
import { SearchParams } from "@entity/post/types/searchParams"
import { useLocation } from "react-router-dom"
import { debounce } from "@shared/utils/debounce"
import { getQueryString } from "@entity/post/services/URLServices"
import { INITIAL_POST } from "@shared/constants/post"

export const usePosts = (searchParams: SearchParams) => {
  const [posts, setPosts] = useState<PostWithUser[]>([])
  const [selectedPost, setSelectedPost] = useState<Post>(INITIAL_POST)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const { search } = useLocation()

  useEffect(() => {
    if (!searchParams) return
    fetchPosts()
  }, [searchParams])

  // 포스트 가져오기
  const fetchPosts = debounce(async () => {
    const queryString = getQueryString(search)

    const { ok, data } = await withLoading(
      setLoading,
      fetchPostsApi,
      queryString,
    )
    if (!ok) return
    const { total } = data

    const posts = joinUserData(data.posts)

    if (posts.length !== total) {
      setTotal(total)
      setPosts(posts)
    }
  }, 100)

  // 포스트 추가
  const addPost = debounce(async (newPost: PostForm) => {
    const { ok, data } = await addPostsApi(newPost)
    if (!ok) return

    const { title, userId, body } = data
    const userData = userCache.getUser(userId)
    setTotal(total)
    setPosts((prev) => [
      {
        id: prev.length,
        title,
        userId,
        body,
        reactions: { likes: 0, dislikes: 0 },
        tags: [],
        views: 0,
        author: userData,
      } as PostWithUser,
      ...prev,
    ])
  }, 100)

  // 포스트 검색
  const searchPosts = async (searchQuery: string, limit: number) => {
    const { ok, data } = await withLoading(
      setLoading,
      searchPostsApi,
      searchQuery,
      limit,
    )
    if (!ok) return

    const { posts, total } = data
    const postWithUsers = joinUserData(posts as Post[])
    setTotal(total)
    setPosts(postWithUsers)
  }

  // 포스트 업데이트
  const updatePost = async (post: Post) => {
    const { ok, data } = await updatePostsApi(post)
    if (!ok) return

    const postWithUser = joinUserData([data] as Post[])[0]

    setPosts(
      posts.map((post) => (post.id === postWithUser.id ? postWithUser : post)),
    )
  }

  // 포스트 삭제
  const deletePost = async (id: number) => {
    const { ok } = await deletePostApi(id)
    if (!ok) return

    setTotal((prev) => prev - 1)
    setPosts(posts.filter((post) => post.id !== id))
  }

  // 포스트 선택
  const updateSelectedPost = useCallback(
    (post: Post) => {
      setSelectedPost(post)
    },
    [selectedPost],
  )

  return {
    posts: useMemo(() => posts, [posts]),
    total: useMemo(() => total, [total]),
    postsLoading: useMemo(() => loading, [loading]),
    selectedPost: useMemo(() => selectedPost, [selectedPost]),
    addPost,
    deletePost,
    updatePost,
    fetchPosts,
    searchPosts,
    updateSelectedPost,
  }
}
