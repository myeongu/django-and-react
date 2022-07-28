import React from "react";
import About from "./About";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import AccountsRoutes from "./accounts";
import LoginRequiredPage from "utils/LoginRequiredPage";
import PostNew from "./PostNew";


function Root() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginRequiredPage />}>
                    <Route path="" element={<Home />} />
                </Route>
                <Route path="/posts/new" element={<LoginRequiredPage />}>
                    <Route path="" element={<PostNew />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/accounts/*" element={<AccountsRoutes />} />
            </Routes>
        </>
    )
}

export default Root;