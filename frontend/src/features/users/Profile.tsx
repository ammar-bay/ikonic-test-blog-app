import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetUserByUsernameQuery } from "./userApiSlice";

const Profile = () => {
  const username = useSelector(selectCurrentUser);
  const { data: user, isLoading } = useGetUserByUsernameQuery(username);
  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Avatar>
          {user.username ? (
            user.username[0].toUpperCase()
          ) : (
            <AccountCircleIcon />
          )}
        </Avatar>
        <Typography variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography color="textSecondary">{user.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;
