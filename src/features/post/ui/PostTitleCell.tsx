import { NORMAL_TAG_STYLE, SELECTED_TAG_STYLE } from "@shared/constants/tag"
import { useSearchParams } from "@features/searchParams/hooks/useSearchParams"
import { searchParamsAtom } from "@features/searchParams/model/atom"
import { highlightText } from "@shared/utils/highlightText"
import { shallowEqual } from "@shared/utils/shallowEqual"
import { TableCell } from "@shared/ui"
import { useAtomValue } from "jotai"

type PropsType = {
  title: string
  tags: string[]
}

export const PostTitleCell: React.FC<PropsType> = ({ title, tags }) => {
  const { updateSearchParams } = useSearchParams()
  const { q, selectedTag } = useAtomValue(searchParamsAtom)

  return (
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(title, q)}</div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={`${index}th-${tag}`}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                shallowEqual(selectedTag, tag)
                  ? SELECTED_TAG_STYLE
                  : NORMAL_TAG_STYLE
              }`}
              onClick={() => {
                updateSearchParams({ selectedTag: tag, skip: 0 })
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
  )
}
