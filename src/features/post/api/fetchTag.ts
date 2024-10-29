export const fetchTag = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return { ok: true, data }
  } catch (e) {
    console.error("태그 가져오기 오류" + e)
    return { ok: false, data: [] }
  }
}
