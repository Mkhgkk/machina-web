import React from "react";
import registerBack from "../../assets/registerBack.jpeg";
import { Form, Input, Button, Typography, Row, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import colors from "../../config/colors";
import routes from "../routes";
import userService from "../../services/userService";
import authService from "../../services/authService";

const { Text } = Typography;

const onFinish = async (values) => {
  try {
    const response = await userService.register(values);
    authService.loginWithJwt(response.data);
    window.location = routes.ADMIN_MACHINES;
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      message.error(ex.response.data);
  }
};

function Register() {
  return (
    <Row
      justify="center"
      style={{
        backgroundImage: `url(${registerBack})`,
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
          height: 550,
          marginTop: 100,
        }}
      />
      <div
        style={{
          width: 400,
          height: 550,
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
            name="name"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User name"
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
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password confirm"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
            Or <a href={routes.ADMIN_LOGIN}>login now!</a>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
}

export default Register;
