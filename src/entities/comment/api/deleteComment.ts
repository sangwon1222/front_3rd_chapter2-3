import { fetchComment } from "@entities/comment/api/fetchComment"

export const deleteCommentApi = async (id: number) => {
  const { ok, error } = await fetchComment(`/${id}`, {
    method: "DELETE",
  })
  if (!ok) throw new Error(error ? error : "Failed to deleteComment")
  return id
}
