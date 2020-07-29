import React from "react";
import { Layout, Menu, Avatar } from "antd";
// import userDefault from "../../assets/userdefault.png";
import Text from "antd/lib/typography/Text";
import colors from "../../config/colors";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

function HeadBar() {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="2">
          <LogoutOutlined />
          logout
        </Menu.Item>
      </Menu>
      <Avatar
        style={{ backgroundColor: colors.primary, marginLeft: 15 }}
        icon={<UserOutlined />}
      />
      <Text
        style={{
          color: colors.white,
          marginLeft: 10,
          opacity: 0.7,
        }}
      >
        username
      </Text>
    </Header>
  );
}

export default HeadBar;
