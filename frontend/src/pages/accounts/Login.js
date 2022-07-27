import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import useLocalStorage from "utils/useLocalStorage";
import { useAppContext } from "store";
import { setToken } from "store";

export default function Login() {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});
            
            const data = { username, password };
            try {
                const response = await axios.post("http://localhost:8000/accounts/token/", data);
                const { data: { token: jwtToken }} = response;
                
                // setJwtToken(jwtToken)
                dispatch(setToken(jwtToken)) ;

                console.log(jwtToken)

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{color: "#103ee9"}} />
                });

                // navigate("/accounts/login") // TODO: 이동 주소
            } 
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디와 암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}} />
                    })

                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                            }
                            return acc
                        }, {})
                    )

                }
            }
        }
        fn();
    }
    return (
        <Card title="로그인"  >
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    {
                        min: 5,
                        message: "5글자 이상 입력해주세요."
                    }
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

