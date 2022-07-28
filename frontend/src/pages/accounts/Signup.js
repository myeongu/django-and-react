import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "api";
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});
            
            const data = { username, password };
            try {
                await axiosInstance.post("/accounts/signup/", data);

                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color: "#103ee9"}} />
                });

                navigate("/accounts/login")
            } 
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "회원가입 실패",
                        description: "아이디와 암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color: "#ff3333"}} />
                    })

                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages => { username: ["m1", "m2"], password: [] }
                    // python에서 dict.items() => Object.entries()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                // errors : ["m1", "m2"].join(" ") => "m1 m2"
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                            }
                            return acc
                        }, {}) // reduce의 첫번째 인자는 함수, 두번째 인자는 object -> [key, value]를 받아온 뒤 acc에 누적
                    )

                }
            }
        }
        fn();
    }

    return (
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
    )
}