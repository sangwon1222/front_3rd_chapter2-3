export const deleteCommentApi = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
    return id
  } catch (e) {
    throw new Error("Failed to delete comment" + e)
  }
}
