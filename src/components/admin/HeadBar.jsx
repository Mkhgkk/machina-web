import React, { useContext } from "react";
import { Layout, Avatar, Modal, Button } from "antd";
import Text from "antd/lib/typography/Text";
import colors from "../../config/colors";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import authService from "../../services/authService";
import routes from "../../routes/routes";
import UserContext from "../../context/UserContext";

const { Header } = Layout;
const { confirm } = Modal;

const handleLogout = () => {
  confirm({
    title: "Would you like to log out?",
    icon: <LogoutOutlined />,
    okText: "Logout",
    onOk() {
      authService.logout();
      window.location.replace(routes.ADMIN_LOGIN);
    },
  });
};

function HeadBar() {
  const { user } = useContext(UserContext);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button type="text" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Button>

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
        {user && user.name}
      </Text>
    </Header>
  );
}

export default HeadBar;
