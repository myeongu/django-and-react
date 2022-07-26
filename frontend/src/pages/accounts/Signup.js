import { Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";

export default function Signup() {
    const navigate = useNavigate()
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [inputs, setInputs] = useState({username:"", password:""});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formDisabled, setFormDisabled] = useState(true);
    

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        axios.post("http://localhost:8000/accounts/signup/", inputs)
            .then(response => {
                console.log("response : ", response);
                navigate("/accounts/login");
            })
            .catch(error => {
                console.log("error : ", error);
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(" "),
                        password: (error.response.data.password || []).join(" ")
                    })
                }
            })
            .finally(() => {
                setLoading(false);
            })

        console.log("onSubmit : ", inputs);
    }

    useEffect(() => {
        const isEnable = Object.values(inputs).every(s => s.length > 0);
        // const isDisabled = (inputs.username.length === 0 || inputs.password.length === 0);
        setFormDisabled(!isEnable)
    }, [inputs])

    const onChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
        // setInputs({
        //     ...inputs,
        //     [name]: value
        // });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input 
                        type="text" 
                        name="username" 
                        // onChange={e => setUsername(e.target.value)} 
                        onChange={onChange}
                    />
                    {errors.username && <Alert type="error" message={errors.username} />}
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        // onChange={e => setPassword(e.target.value)} 
                        onChange={onChange}
                    />
                    {errors.password && <Alert type="error" message={errors.password} />}
                </div>
                <input type="submit" value={"회원가입"} disabled={loading || formDisabled} />
            </form>
        </div>
    )
}