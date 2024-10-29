import { User } from "@shared/types/user"
import { TableCell } from "@shared/ui"

type PropsType = {
  author: User
  openUserModal: (user: User) => void
}

export const PostUserCell: React.FC<PropsType> = ({
  author,
  openUserModal,
}) => {
  //   console.log(author)
  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => openUserModal(author)}
      >
        <img
          src={author.image}
          alt={author.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{author.username}</span>
      </div>
    </TableCell>
  )
}
