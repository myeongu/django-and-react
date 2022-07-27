import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd"
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import useAxios from 'axios-hooks'
import "./SuggestionList.scss"
import axios from "axios";


export default function SuggestionList({ style }) {
    const { store: { jwtToken }} = useAppContext();

    const [userList, setUserList] = useState([]);
    
    const headers = { Authorization: `Bearer ${jwtToken}`}
    const [{ data: originUserList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers: headers,
    })

    // useList가 렌더시마다 새로 map을 함 -> useMemo 훅으로 개선 가능!
    // dependency가 바뀔 때에만 연산을 수행
    useEffect(() => {
        if ( !originUserList )
            setUserList([]);
        else {
            setUserList(originUserList.map(user => ({...user, is_follow: false})))
        }
    }, [originUserList])
    
    const onFollowUser = (username) => {
        const data = { username };
        const config = { headers }
        axios.post("http://localhost:8000/accounts/follow/", data, config)
            .then(response => {
                setUserList(prevUserList => {
                    return prevUserList.map(user => 
                        ( user.username !== username ) ? user : { ...user, is_follow: true}
                    )
                })
            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>로딩 중 에러가 발생했습니다.</div>}

            <button onClick={() => refetch()}>Reload</button>

            <Card title="Suggestions for you" size="small">
                {userList.map(suggestionUser => (
                        <Suggestion 
                            key={suggestionUser.username} 
                            suggestionUser={suggestionUser} 
                            onFollowUser={onFollowUser}
                        />
                ))}
            </Card>
        </div>
    )
}