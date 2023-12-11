import { useRef, useState, useEffect, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authSlice";

const Registration: FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [username, setUser] = useState<string>("");
  const [password, setPwd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch(register({ username, password, email }) as any);
      setUser("");
      setPwd("");
      navigate("/welcome");
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

  const content = false ? (
    // const content = isLoading ? (
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

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <button type="submit">Register</button>
      </form>
    </section>
  );

  return content;
};

export default Registration;
