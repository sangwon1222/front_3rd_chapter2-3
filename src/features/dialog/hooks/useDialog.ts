import { PrimitiveAtom } from "jotai"
import { useAtom } from "jotai"

export const useDialog = (dialogAtom: PrimitiveAtom<boolean>) => {
  const [opened, setDialogs] = useAtom(dialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
