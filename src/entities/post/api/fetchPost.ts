/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJson } from "@shared/utils/fetchJson"

export const fetchPost = async (
  url: string,
  requestInit?: Omit<RequestInit, "body"> & { body?: any },
) => {
  const { ok, data, error } = await fetchJson(`/api/posts${url}`, {
    ...requestInit,
  })
  return { ok, data, error }
}
