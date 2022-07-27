import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";

const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
    const { store: { jwtToken } } = useAppContext();
    const [ postList, setPostList ] = useState([]);
    console.log("jwtToken : ", jwtToken)
    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        axios.get(apiUrl, { headers })
            .then(response => {
                const { data } = response;
                console.log("loaded response : ", response);
                setPostList(data);
            })
            .catch(error => {
                // error.response
            })
        console.log("mounted");
    }, [jwtToken]);

    return (
        <div>
            {postList.length === 0 &&
                <Alert type="warning" message="포스팅이 없습니다." />
            }
            {postList.map(post => (
                <Post post={post} key={post.id} />
            )
            )}
        </div>
    )
}

export default PostList;