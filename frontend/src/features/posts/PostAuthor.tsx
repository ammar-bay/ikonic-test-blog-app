import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

interface IProps {
  userId: string;
}

const PostAuthor: React.FC<IProps> = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
