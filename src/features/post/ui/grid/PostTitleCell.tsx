import { SearchParams } from "@entity/post/types/searchParams"
import { NORMAL_TAG_STYLE, SELECTED_TAG_STYLE } from "@shared/constants/tag"
import { TableCell } from "@shared/ui"
import { highlightText } from "@shared/utils/highlightText"
import { shallowEqual } from "@shared/utils/shallowEqual"

type PropsType = {
  title: string
  searchQuery: string
  tags: string[]
  selectedTag: string
  updateSearchParams: (data: Partial<SearchParams>) => void
}

export const PostTitleCell: React.FC<PropsType> = ({
  title,
  searchQuery,
  tags,
  selectedTag,
  updateSearchParams,
}) => {
  return (
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(title, searchQuery)}</div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
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
