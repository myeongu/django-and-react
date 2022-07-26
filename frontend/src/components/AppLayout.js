import { Input, Menu } from "antd";
import React from "react";
import "./AppLayout.scss";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";

function AppLayout({ children }) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">Instagram</h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item key={1}>메뉴1</Menu.Item>
                        <Menu.Item key={2}>메뉴2</Menu.Item>
                        <Menu.Item key={3}>메뉴3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">
                {children}
            </div>
            <div className="sidebar">
                <StoryList style={{ marginBottom: "1rem" }} />
                <SuggestionList style={{ marginBottom: "1rem" }} />
            </div>
            <div className="footer">
                &2022 myeongu kang
            </div>
        </div>
    )
}

export default AppLayout;