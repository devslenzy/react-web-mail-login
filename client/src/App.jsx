import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Dashboard/Home";
import { HomePage } from "./components/pages/HomePage";
import { NotFound } from "./components/pages/NotFound";
import { Login } from "./components/pages/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};