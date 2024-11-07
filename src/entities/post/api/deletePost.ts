import { fetchPost } from "./fetchPost"

/** 게시물 삭제 */
export const deletePostApi = async (id: number): Promise<number> => {
  const { ok, error } = await fetchPost(`/${id}`, { method: "DELETE" })
  if (!ok) throw new Error(error ? error : "Failed to deleteComment")
  return id
}
