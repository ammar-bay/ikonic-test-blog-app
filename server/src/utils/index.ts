import jwt from "jsonwebtoken";

export const generateAccessToken = (user: {
  username: string;
  role: string;
}) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: {
  username: string;
  role: string;
}) => {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
};
