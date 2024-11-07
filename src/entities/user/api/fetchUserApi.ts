/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJson } from "@shared/utils/fetchJson"

export const fetchUserApi = async (
  url: string,
  requestInit?: Omit<RequestInit, "body"> & { body?: any },
) => {
  const { ok, data, error } = await fetchJson(`/api/users/${url}`, {
    ...requestInit,
  })
  if (!ok) throw new Error(error ? error : "Failed to fetch user")
  return data
}
