export const readCommentApi = async (postId: number) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    return await response.json()
  } catch (e) {
    throw new Error("Failed to read comments" + e)
  }
}
