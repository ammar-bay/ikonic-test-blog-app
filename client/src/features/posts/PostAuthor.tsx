import { useSelector } from "react-redux";
import { selectUser } from "../users/usersSlice";

interface IProps {
  userId: string;
}

const PostAuthor: React.FC<IProps> = ({ userId }) => {
  const user = useSelector(selectUser);

  return <span>by {user ? user.username : "Unknown author"}</span>;
};
export default PostAuthor;
