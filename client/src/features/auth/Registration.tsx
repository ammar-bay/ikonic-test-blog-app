import { useRef, useState, useEffect, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";
import { Button, TextField, Typography } from "@mui/material";
import { AuthState, setCredentials } from "./authSlice";

const Registration: FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [username, setUser] = useState<string>("");
  const [password, setPwd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const canSend = username && password && email;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const creds: AuthState = await register({
        username,
        password,
        email,
      }).unwrap();
      dispatch(setCredentials(creds));
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err: any) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);

  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <Typography variant="h2" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          id="username"
          inputRef={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Email"
          type="text"
          id="email"
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
          variant="outlined"
          margin="normal"
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={!canSend}
        >
          Register
        </Button>

        <Typography variant="body1" style={{ marginTop: "16px" }}>
          Already have an account?
          <Button color="primary" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </Typography>
      </form>
    </section>
  );

  return content;
};

export default Registration;
