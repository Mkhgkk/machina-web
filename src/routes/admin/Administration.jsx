import React from "react";
import { Layout } from "antd";
import SideBar from "../../components/admin/SideBar";
import HeadBar from "../../components/admin/HeadBar";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import MachineNew from "./MachineNew";
import MachineList from "./MachineList";
import MachineDetail from "./MachineDetail";
import ManufucturerList from "./ManufucturerList";
import ManufucturerNew from "./ManufucturerNew";
import ManufucturerDetail from "./ManufucturerDetail";

const { Content } = Layout;

function Administration() {
  return (
    <Layout style={{ height: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <HeadBar />
        <Content>
          <Switch>
            <Route exact path={routes.ADMIN_MACHINES} component={MachineList} />
            <Route
              path={routes.ADMIN_MACHINE_DETAIL}
              component={MachineDetail}
            />
            <Route path={routes.ADMIN_MACHINE_NEW} component={MachineNew} />
            <Route
              exact
              path={routes.ADMIN_MANUFUCTURERS}
              component={ManufucturerList}
            />
            <Route
              path={routes.ADMIN_MANUFUCTURER_DETAIL}
              component={ManufucturerDetail}
            />
            <Route
              path={routes.ADMIN_MANUFUCTURER_NEW}
              component={ManufucturerNew}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Administration;
