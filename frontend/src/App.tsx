import { Routes, Route, Outlet, Link } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AuthPage />} />
        <Route path=":user" element={<UserPage />} />
        <Route path="*" element={<h1>Page Not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
