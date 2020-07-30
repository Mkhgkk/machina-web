import React, { useState, useEffect } from "react";
import {
  Descriptions,
  Space,
  Typography,
  Row,
  Button,
  Form,
  Input,
  Popconfirm,
  Spin,
  message,
} from "antd";
import {
  ShopOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TitleWithIcon from "../../components/admin/TitleWithIcon";
import { useParams, useHistory } from "react-router-dom";
import ManufucturerService from "../../services/manufucturerService";
import logService from "../../services/logService";
import routes from "../routes";

const { Title, Text } = Typography;

function ManufucturerDetail() {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await ManufucturerService.getManufucturer(id);
      setData(data);
      setLoading(false);
    } catch (ex) {
      logService.log(ex);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await ManufucturerService.saveManufucturer(values, id);

      if (result) {
        setData(result.data);
        setEdit(false);
        setLoading(false);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await ManufucturerService.deleteManufucturer(id);
      history.push(routes.ADMIN_MANUFUCTURERS);
      // window.location.replace(routes.ADMIN_MANUFUCTURERS);
    } catch (ex) {
      logService.log(ex);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Spin size="large" spinning={loading}>
        {data && (
          <Form
            name="dynamic_form_item"
            layout="vertical"
            hideRequiredMark
            initialValues={{
              name: data && data.name,
              address: data && data.address,
              description: data && data.description,
              website: data && data.website,
              contacts: data && data.contacts,
              email: data && data.email,
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
                <Row justify="end">
                  <Space>
                    <Form.Item noStyle style={{ display: "block" }}>
                      <Button type="primary" htmlType="submit">
                        Save changes
                      </Button>
                    </Form.Item>
                    <Button onClick={() => setEdit(false)}>Cancel</Button>
                  </Space>
                </Row>
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
                    rules={[
                      { required: true, message: "Please enter website" },
                    ]}
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
                    rules={[
                      { required: true, message: "Please enter address" },
                    ]}
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
        )}
      </Spin>
    </div>
  );
}

export default ManufucturerDetail;
