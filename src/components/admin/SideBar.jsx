import React from "react";
import { Layout, Menu, Typography } from "antd";
import { ControlOutlined, ShopOutlined } from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";

import routes from "../../routes/routes";
import colors from "../../config/colors";

const { Text } = Typography;
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideBar() {
  const history = useHistory();
  const { pathname } = history.location;

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

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={pathname}
        defaultOpenKeys={
          pathname.includes(routes.ADMIN_MACHINE_NEW) ||
          pathname.includes(routes.ADMIN_MACHINES)
            ? ["machine"]
            : pathname.includes(routes.ADMIN_MANUFUCTURER_NEW) ||
              pathname.includes(routes.ADMIN_MANUFUCTURERS)
            ? ["manufucturer"]
            : ["machine", "manufucturer"]
        }
      >
        <SubMenu key="machine" title="Machine" icon={<ControlOutlined />}>
          <Menu.Item key={routes.ADMIN_MACHINES}>
            <NavLink to={routes.ADMIN_MACHINES}>Machines</NavLink>
          </Menu.Item>

          <Menu.Item key={routes.ADMIN_MACHINE_NEW}>
            <NavLink to={routes.ADMIN_MACHINE_NEW}>Add machine</NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="manufucturer"
          title="Manufucturer"
          icon={<ShopOutlined />}
        >
          <Menu.Item key={routes.ADMIN_MANUFUCTURERS}>
            <NavLink to={routes.ADMIN_MANUFUCTURERS}>Manufucturers</NavLink>
          </Menu.Item>

          <Menu.Item key={routes.ADMIN_MANUFUCTURER_NEW}>
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
