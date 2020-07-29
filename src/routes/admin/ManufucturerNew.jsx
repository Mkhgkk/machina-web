import React from "react";
import { Typography, Space, Row, Col, Input, Form, Button } from "antd";
import {
  PlusOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import TitleWithIcon from "../../components/admin/TitleWithIcon";

import colors from "../../config/colors";

const { Text, Title } = Typography;

function ManufucturerNew() {
  return (
    <div style={{ padding: 40 }}>
      <Title level={3}>
        <Space>
          <PlusOutlined />
          Add new manufucturer
        </Space>
      </Title>

      <Form
        style={{ width: "60%" }}
        name="dynamic_form_item"
        layout="vertical"
        hideRequiredMark
        onFinish={(values) => console.log(values)}
      >
        <TitleWithIcon title="Manufucturer" icon={<InfoCircleOutlined />} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Please enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Please enter address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter website" }]}
            >
              <Input placeholder="Please enter website" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Please enter description" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Row style={{ marginBottom: 10 }}>
              <Text style={{ color: colors.white }}>Contacts</Text>
            </Row>
            <Form.List name="contacts">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            placeholder="Please enter contact"
                            style={{ width: "100%" }}
                            suffix={
                              <MinusCircleOutlined
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            }
                          />
                        </Form.Item>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "100%" }}
                      >
                        <PlusOutlined /> Add contact
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Col>

          <Col span={12}>
            <Row style={{ marginBottom: 10 }}>
              <Text style={{ color: colors.white }}>Email</Text>
            </Row>
            <Form.List name="email">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          noStyle
                        >
                          <Input
                            placeholder="Please enter email"
                            style={{ width: "100%" }}
                            type="email"
                            suffix={
                              <MinusCircleOutlined
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            }
                          />
                        </Form.Item>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "100%" }}
                      >
                        <PlusOutlined /> Add email
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Col>
        </Row>

        <Row justify="end">
          <Form.Item>
            <Button
              type="primary"
              style={{ marginTop: 50 }}
              htmlType="submit"
              size="large"
            >
              Save manufucturer
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

export default ManufucturerNew;
