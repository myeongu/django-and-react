import React from "react";
import AppLayout from "components/AppLayout"
import About from "./About";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import AccountsRoutes from "./accounts";
import LoginRequiredPage from "utils/LoginRequiredPage";


function Root() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<LoginRequiredPage />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/accounts/*" element={<AccountsRoutes />} />
            </Routes>
        </AppLayout>
    )
}

export default Root;