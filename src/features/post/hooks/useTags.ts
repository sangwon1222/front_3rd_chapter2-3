import { Tag } from "@features/types/tag"
import { useEffect, useState } from "react"
import { fetchTag } from "../api/fetchTag"
import { useLocation } from "react-router-dom"

export const useTags = () => {
  const location = useLocation()
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const selectedTag = params.get("tag") || ""
    setSelectedTag(selectedTag)

    fetchTag().then(({ ok, data }) => {
      if (ok) setTags(data)
    })
  }, [])

  return { tags, selectedTag }
}
