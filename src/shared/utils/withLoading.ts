export const withLoading = async <T, Args extends unknown[]>(
  setLoading: (loading: boolean) => void,
  apiCall: (...args: Args) => Promise<{ ok: boolean; data: T }>,
  ...args: Args
): Promise<{ ok: boolean; data: T }> => {
  setLoading(true)
  try {
    const { ok, data } = await apiCall(...args)
    return { ok, data }
  } catch (e) {
    console.error("withLoading API error:", e)
    return { ok: false, data: [] as T }
  } finally {
    setLoading(false)
  }
}
