import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

function Post({ post }) {
    const { caption, location, photo } = post;
    return (
        <div>
            <Card
                cover={<img src={photo} alt={caption} />}
                hoverable
                actions={[
                    <HeartOutlined />,
                    <HeartFilled />
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar size={"large"} icon={<UserOutlined />} />}
                    title={location} 
                    description={caption} 
                />
            </Card>
            {/* <img src={photo} alt={caption} style={{width: '100px'}} />
            {caption}, {location} */}
        </div>
    )
}

export default Post;