import { convertToTagOptions } from "@entity/post/services/convertOptions"
import { SORT_BY_LIST, SORT_ORDER_LIST } from "@shared/constants/search"
import { SearchInput } from "@shared/ui/input/SearchInput"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { Tag } from "@features/types/tag"
import { useState } from "react"
import { SearchParams } from "@entity/post/types/searchParams"

type PropsType = {
  searchParams: SearchParams
  updateSearchParams: (v: Partial<SearchParams>) => void
  searchPosts: (v: string, limit: number) => Promise<void>
  tags: Tag[]
}

export const PostSearch: React.FC<PropsType> = ({
  searchParams,
  updateSearchParams,
  searchPosts,
  tags,
}) => {
  const tagList = convertToTagOptions(tags)

  const [search, setSearch] = useState(searchParams.q)

  const handleSearchPost = async () => {
    updateSearchParams({ q: search })
    await searchPosts(searchParams.q, searchParams.limit)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchInput
          placeholder="게시물 검색..."
          initialValue={search}
          onChange={(v) => setSearch(v)}
          onEnter={handleSearchPost}
        />
      </div>

      <SelectRoot
        items={tagList}
        placeholder="태그 선택"
        value={searchParams.selectedTag}
        onValueChange={(v) => updateSearchParams({ selectedTag: v })}
      />
      <SelectRoot
        items={SORT_BY_LIST}
        placeholder="정렬 기준"
        value={searchParams.sortBy}
        onValueChange={(v) => updateSearchParams({ sortBy: v })}
      />
      <SelectRoot
        items={SORT_ORDER_LIST}
        placeholder="정렬 순서"
        value={searchParams.sortOrder}
        onValueChange={(v) => updateSearchParams({ sortOrder: v })}
      />
    </div>
  )
}
