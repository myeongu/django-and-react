import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";

function AccountsRoutes() {
    return (
        <>
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default AccountsRoutes;