import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "components/AppLayout";
import PostList from "components/PostList";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { Button } from "antd";

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/posts/new");
    }

    const sidebar = (
        <>
            <Button type="primary" block style={{marginBottom:"1rem"}} onClick={handleClick}>
                새 포스팅 쓰기
            </Button>
            <StoryList style={{ marginBottom: "1rem" }} />
            <SuggestionList style={{ marginBottom: "1rem" }} />
        </>
    )

    return (
        <AppLayout sidebar={sidebar} >
            <PostList />
        </AppLayout>
    )
}

export default Home;