import { SORT_BY_LIST, SORT_ORDER_LIST } from "@features/searchParams/constants"
import { searchParamsAtom } from "@features/searchParams/model/atom"
import { useSearchPost } from "@entities/post/hooks/useSearchPost"
import { SearchParams } from "@features/searchParams/types"
import { SearchInput } from "@shared/ui/input/SearchInput"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { useTags } from "@entities/tag/hooks/useTags"
import { useAtom } from "jotai"

export const PostSearch: React.FC = () => {
  const [searchParams, updateSearchParams] = useAtom(searchParamsAtom)
  const { search, setSearch } = useSearchPost(searchParams.q)
  const { tags } = useTags()

  const handleSearchPost = () => {
    updateSearchParams((prev: SearchParams) => ({ ...prev, q: search }))
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
        items={tags}
        placeholder="태그 선택"
        value={searchParams.selectedTag}
        onValueChange={(selectedTag) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, selectedTag }))
        }
      />
      <SelectRoot
        items={SORT_BY_LIST}
        placeholder="정렬 기준"
        value={searchParams.sortBy}
        onValueChange={(sortBy) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, sortBy }))
        }
      />
      <SelectRoot
        items={SORT_ORDER_LIST}
        placeholder="정렬 순서"
        value={searchParams.sortOrder}
        onValueChange={(sortOrder) =>
          updateSearchParams((prev: SearchParams) => ({ ...prev, sortOrder }))
        }
      />
    </div>
  )
}
