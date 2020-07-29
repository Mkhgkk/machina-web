import React, { useState } from "react";
import {
  Descriptions,
  Space,
  Typography,
  Row,
  Button,
  Form,
  Input,
  Popconfirm,
} from "antd";
import {
  ShopOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TitleWithIcon from "../../components/admin/TitleWithIcon";

const { Title, Text } = Typography;
const data = {
  name: "Yaoohoo company",
  address:
    "Data disk type: MongoDB Database version: 3.4 Package: dds.mongo.mid",
  description:
    "Data disk type: MongoDB Database version: 3.4 Package: dds.mongo.mid",
  website: "www.unifella.co",
  contacts: ["0101929923", "29381293023", "1293819230123"],
  email: ["222@ddd.ccc"],
};

function ManufucturerDetail() {
  const [edit, setEdit] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    setEdit(false);
  };

  const handleDelete = () => {};
  return (
    <div style={{ padding: 40 }}>
      <Form
        name="dynamic_form_item"
        layout="vertical"
        hideRequiredMark
        initialValues={{
          name: data.name,
          address: data.address,
          description: data.description,
          website: data.website,
          contacts: data.contacts,
          email: data.email,
        }}
        onFinish={handleSubmit}
      >
        <Row justify="space-between">
          <Title level={3} style={{ marginBottom: 30 }}>
            <Space>
              <ShopOutlined />
              {data.name}
            </Space>
          </Title>
          {edit ? (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save changes
              </Button>
            </Form.Item>
          ) : (
            <Button htmlType="button" onClick={() => setEdit(true)}>
              <EditOutlined /> Edit manufucturer
            </Button>
          )}
        </Row>
        <TitleWithIcon
          title="Manufucturer"
          icon={<InfoCircleOutlined />}
          marginTop={0}
        />
        <Descriptions
          layout="vertical"
          bordered
          column={2}
          style={{ width: "60%" }}
        >
          <Descriptions.Item label="Name">
            {edit ? (
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
                noStyle
              >
                <Input />
              </Form.Item>
            ) : (
              data.name
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Website">
            {edit ? (
              <Form.Item
                name="website"
                rules={[{ required: true, message: "Please enter website" }]}
                noStyle
              >
                <Input />
              </Form.Item>
            ) : (
              data.website
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {edit ? (
              <Form.Item
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
                noStyle
              >
                <Input.TextArea autoSize />
              </Form.Item>
            ) : (
              data.address
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {edit ? (
              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
                noStyle
              >
                <Input.TextArea autoSize />
              </Form.Item>
            ) : (
              data.description
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Contacts">
            {edit ? (
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
            ) : (
              data.contacts &&
              data.contacts.map((contact) => (
                <Text key={contact} style={{ display: "block" }}>
                  {contact}
                </Text>
              ))
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {edit ? (
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
            ) : (
              data.email &&
              data.email.map((e) => (
                <Text key={e} style={{ display: "block" }}>
                  {e}
                </Text>
              ))
            )}
          </Descriptions.Item>
        </Descriptions>
        {edit && (
          <Row style={{ marginTop: 20, width: "60%" }} justify="end">
            <Popconfirm
              title="Are you sure delete this manufucturer?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Row>
        )}
      </Form>
    </div>
  );
}

export default ManufucturerDetail;
