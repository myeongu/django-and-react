import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequiredPage from "utils/LoginRequiredPage";

function AccountsRoutes() {
    return (
        <>
            <Routes>
                <Route path="/profile/" element={<LoginRequiredPage />}>
                    <Route path="/" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </>
    )
}

export default AccountsRoutes;