import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<PostsList />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
