import { SearchParams } from "@features/searchParams/types"
import { atom } from "jotai"

export const searchParamsAtom = atom<SearchParams>({
  skip: 0,
  limit: 10,
  sortBy: "asc",
  sortOrder: "",
  q: "",
  selectedTag: "",
})
