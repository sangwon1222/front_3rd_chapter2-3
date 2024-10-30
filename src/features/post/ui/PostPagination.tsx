import { useSearchParams } from "@features/searchParams/hooks/useSearchParams"
import { searchParamsAtom } from "@features/searchParams/model/atom"
import { LIMIT_DEFAULT, LIMIT_LIST } from "@shared/constants/search"
import { SelectRoot } from "@shared/ui/select/SelectRoot"
import { Button } from "@shared/ui/button"
import { useAtomValue } from "jotai"

type PropsType = {
  total: number
}

export const PostPagination: React.FC<PropsType> = ({ total }) => {
  const { limit, skip } = useAtomValue(searchParamsAtom)
  const { updateSearchParams, goNextPage, goPrevPage } = useSearchParams()

  const hasNotPrev = skip === 0
  const hasNotNext = skip + limit >= total
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <span>표시</span>

          <SelectRoot
            items={LIMIT_LIST}
            value={limit.toString()}
            onValueChange={(v) => updateSearchParams({ limit: Number(v) })}
            placeholder={LIMIT_DEFAULT}
          />

          <span>항목</span>
        </div>

        <span className="border-2  px-2">전체: {total} 항목 </span>
      </div>
      <div className="flex gap-2">
        <Button disabled={hasNotPrev} onClick={goPrevPage}>
          이전
        </Button>
        <Button disabled={hasNotNext} onClick={goNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}