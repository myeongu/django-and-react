import React, { useEffect, useState } from "react";
import { Card } from "antd"
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import axios from "axios";
import "./SuggestionList.scss"


export default function SuggestionList({ style }) {
    const { store: { jwtToken }} = useAppContext();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function fetchUserList() {
            const apiUrl = "http://localhost:8000/accounts/suggestions/";
            const headers = { Authorization: `Bearer ${jwtToken}`}
            try {
                const { data } = await axios.get(apiUrl, { headers });
                setUserList(data);
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchUserList();
    }, []);

    return (
        <div style={style}>
            <Card title="Suggestions for you" size="small">
                {userList.map(suggestionUser => (
                    <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser} />
                ))}
            </Card>
        </div>
    )
}