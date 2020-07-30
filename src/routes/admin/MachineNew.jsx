import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  Upload,
  Radio,
  message,
  Spin,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  InfoCircleOutlined,
  SubnodeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import TitleWithIcon from "../../components/admin/TitleWithIcon";
import { categories } from "../../data/enums";
import colors from "../../config/colors";
import { useHistory } from "react-router-dom";
import MachineService from "../../services/machineService";
import routes from "../routes";
import ManufucturerService from "../../services/manufucturerService";
import logService from "../../services/logService";

const { Text, Title } = Typography;
const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function MachineNew() {
  const history = useHistory();
  const [manufucturers, setManufucturers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getManufacturers();
  }, []);

  const getManufacturers = async () => {
    setLoading(true);
    try {
      const result = await ManufucturerService.getManufucturerSelector();
      if (result) setManufucturers(result.data);
      setLoading(false);
    } catch (ex) {
      logService.log(ex);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await MachineService.createMachine(values);
      message.success(`${values.title} has been created successfully.`);
      history.push(routes.ADMIN_MACHINES);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
    setLoading(false);
  };
  return (
    <div style={{ padding: 40 }}>
      <Title level={3}>
        <Space>
          <PlusOutlined />
          Add new machine
        </Space>
      </Title>
      <Spin size="large" spinning={loading}>
        <Form
          style={{ width: "60%" }}
          name="dynamic_form_nest_item"
          layout="vertical"
          hideRequiredMark
          onFinish={handleSubmit}
        >
          <TitleWithIcon title="Machine" icon={<InfoCircleOutlined />} />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Please select category">
                  {categories &&
                    categories.map((category) => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="manufucturer"
                label="Manufucturer"
                rules={[
                  { required: true, message: "Please select manufucturer" },
                ]}
              >
                <Select placeholder="Please select manufucturer">
                  {manufucturers &&
                    manufucturers.map((manufucturer) => (
                      <Option key={manufucturer._id} value={manufucturer._id}>
                        {manufucturer.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="link"
                label="Link"
                rules={[{ required: true, message: "Please select link" }]}
              >
                <Input placeholder="Please enter link" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="minimumQuantity"
                label="Minimum quantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter minimum quantity",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Please enter number",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Please enter minimum quantity"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please select description" },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 5 }}
                  placeholder="Please enter description"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Images">
                <Form.Item
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                  rules={[{ required: true, message: "Please upload image" }]}
                >
                  <Upload.Dragger
                    name="images"
                    action="http://localhost:3900/api/images"
                    multiple
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p>Click or drag photo to this area to upload</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <TitleWithIcon title="Options" icon={<SubnodeOutlined />} />
          <Form.List name="options">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <div key={field.key} style={{ marginBottom: 20 }}>
                      <Row
                        style={{ marginBottom: 15 }}
                        align="middle"
                        justify="space-between"
                      >
                        <Text style={{ color: colors.white }}>
                          Option {index + 1}
                        </Text>
                        <Button
                          type="link"
                          onClick={() => {
                            remove(field.name);
                          }}
                        >
                          Remove
                        </Button>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "name"]}
                            fieldKey={[field.fieldKey, "name"]}
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter name",
                              },
                            ]}
                          >
                            <Input placeholder="Please enter name" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "price"]}
                            fieldKey={[field.fieldKey, "price"]}
                            label="Price"
                            rules={[
                              {
                                required: true,
                                message: "Please enter price",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Please enter price",
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "weight"]}
                            fieldKey={[field.fieldKey, "weight"]}
                            label="Weight"
                          >
                            <Input
                              suffix="kg"
                              placeholder="Please enter weight"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "power"]}
                            fieldKey={[field.fieldKey, "power"]}
                            label="Power"
                          >
                            <Input
                              suffix="watts"
                              placeholder="Please enter power"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "material"]}
                            fieldKey={[field.fieldKey, "material"]}
                            label="Material"
                          >
                            <Input placeholder="Please enter material" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "warranty"]}
                            fieldKey={[field.fieldKey, "warranty"]}
                            label="Warranty"
                          >
                            <Input
                              placeholder="Please enter warranty"
                              suffix="years"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "isSecondHand"]}
                            fieldKey={[field.fieldKey, "isSecondHand"]}
                            label="Is this a second hand machine?"
                            rules={[
                              {
                                required: true,
                                message: "Please choose one",
                              },
                            ]}
                          >
                            <Radio.Group>
                              <Radio value={true}>Yes</Radio>
                              <Radio value={false}>No</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add option
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Row justify="end">
            <Button
              type="primary"
              style={{ marginTop: 50 }}
              htmlType="submit"
              size="large"
            >
              Save machine
            </Button>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}

export default MachineNew;
