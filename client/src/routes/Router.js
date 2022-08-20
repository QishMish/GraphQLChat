import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Chat from "../pages/chat/Index";
import ChatMessages from "../components/chat/Index";
import SignIn from "../components/signin/Index";
import SignUp from "../components/signup/Index";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/chat" />} />
          <Route path="chat" element={<Chat />}>
            <Route path=":chatroomId" element={<ChatMessages />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
