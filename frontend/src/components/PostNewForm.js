import React, { useState } from "react";
import { Button, Form, Input, message, Modal, notification, Upload } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import axios from "axios";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import { useNavigate } from "react-router-dom";

export default function PostNewForm() {
    const { store: { jwtToken }} = useAppContext();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });
    const [fieldErrors, setFieldErrors] = useState([]);
    
    const handleUpladChange = ({ fileList }) => {
        setFileList(fileList);
    }
    
    const handlePreviewPhoto = async file => {
        if ( !file.url && file.preview ) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview,
        })
    }

    const handleFinish = async fieldValues => {
        const { caption, location, photo: { fileList } } = fieldValues;

        const formData = new FormData();
        formData.append("caption", caption)
        formData.append("location", location)
        fileList.forEach(file => {
            formData.append("photo", file.originFileObj)
        })
        
        const headers = { Authorization: `Bearer ${jwtToken}`}
        try {
            const response = await axios.post("http://localhost:8000/api/posts/", formData, { headers })
            console.log("success response: ", response)
            navigate("/")
        }
        catch (error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;
                if ( typeof fieldsErrorMessages === "string" ) {
                    console.error()

                    notification.open({
                        message: "서버 오류.",
                        description: `에러) ${status}응답을 받았습니다. 서버 에러를 확인해주세요.`,
                        icon: <FrownOutlined style={{color: "#ff3333"}} />
                    });
                }
                else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages))
                }
            }
        }
    };
    
    return (        
        <Form
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={handleFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[
                {
                    required: true,
                    message: 'Caption을 입력해주세요.',
                },
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[
                {
                    required: true,
                    message: 'Location을 입력해주세요.',
                },
                ]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Photo" name={"photo"} 
                rules={[{required: true, message:"사진을 업로드해주세요."}]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload 
                    listType="picture-card" 
                    fileList={fileList} 
                    beforeUpload={() => {
                        return false
                    }}
                    onChange={handleUpladChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null :
                        <div>
                            <PlusOutlined />
                            <div className="ant-uplaod-text">Upload</div>
                        </div>
                    }
                </Upload>
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
            <Modal 
                visible={previewPhoto.visible} 
                footer={null}
                onCancel={() => setPreviewPhoto({ visible: false })}
            >
                <img src={previewPhoto.base64} alt="Preview" style={{width: "100%"}} />
            </Modal>
        </Form>
    )
}