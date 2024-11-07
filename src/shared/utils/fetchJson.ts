export const fetchJson = async (
  url: string,
  requestInit: Omit<RequestInit, "body"> & { body?: Record<string, unknown> },
) => {
  try {
    const response = await fetch(url, {
      headers: {
        ...requestInit?.headers,
        "Content-Type": "application/json",
      },
      ...{ body: JSON.stringify(requestInit?.body) },
      method: requestInit?.method,
    })

    if (!response.ok) {
      return { ok: false, data: null, error: `Failed to ${url}` }
    }

    return { ok: true, data: await response.json(), error: null }
  } catch (error) {
    return { ok: false, data: null, error: `Failed to ${url}: ${error}` }
  }
}
