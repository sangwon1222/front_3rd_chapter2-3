/** 게시물 삭제 */
export const deletePostApi = async (id: number): Promise<number> => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return id
  } catch (e) {
    throw new Error("Failed to delete post" + e)
  }
}
