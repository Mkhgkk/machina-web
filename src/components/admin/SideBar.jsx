import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  BarsOutlined,
  PlusOutlined,
  ControlOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import routes from "../../routes/routes";
import colors from "../../config/colors";

const { Text } = Typography;
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideBar() {
  return (
    <Sider trigger={null}>
      <div
        className="logo"
        style={{
          color: "white",
          padding: 10,
          paddingBottom: 0,
          textAlign: "center",
        }}
      >
        <Text style={{ fontSize: "1.2em", color: colors.white }}>
          Machinery
        </Text>
        <p style={{ fontSize: "0.9em", opacity: 0.7 }}>Administration</p>
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys="1">
        <SubMenu key="sub1" title="Machine" icon={<ControlOutlined />}>
          <Menu.Item key="1">
            <NavLink to={routes.ADMIN_MACHINES}>Machines</NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to={routes.ADMIN_MACHINE_NEW}>Add machine</NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" title="Manufucturer" icon={<ShopOutlined />}>
          <Menu.Item key="3">
            <NavLink to={routes.ADMIN_MANUFUCTURERS}>Manufucturers</NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to={routes.ADMIN_MANUFUCTURER_NEW}>
              Add manufucturer
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideBar;
