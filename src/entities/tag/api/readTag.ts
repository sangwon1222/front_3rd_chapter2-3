import { fetchTag } from "./fetchTag"

export const readTag = async () => {
  const { ok, data, error } = await fetchTag("")
  if (!ok) throw new Error(error ? error : "Failed to readTag")
  return data
}
