import React from "react";
import loginBack from "../../assets/loginBack.jpeg";
import { Form, Input, Button, Checkbox, Typography, Row } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import colors from "../../config/colors";
import routes from "../routes";

const { Text } = Typography;

const onFinish = (values) => {
  console.log("Received values of form: ", values);
};

function Login() {
  return (
    <Row
      justify="center"
      style={{
        backgroundImage: `url(${loginBack})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: colors.dark,
          width: 400,
          position: "relative",
          left: 200,
          opacity: 0.9,
          height: 500,
          marginTop: 100,
        }}
      />
      <div
        style={{
          width: 400,
          height: 500,
          marginTop: 100,
          padding: 50,
          position: "relative",
          right: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Text style={{ color: colors.white, fontSize: "1.4em" }} level={4}>
            Machinery
          </Text>
          <p>Administration</p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
            Or <a href={routes.ADMIN_REGISTER}>register now!</a>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
}

export default Login;
