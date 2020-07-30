import React, { useState, useEffect } from "react";
import {
  Descriptions,
  Space,
  Typography,
  Row,
  Button,
  Form,
  Col,
  Input,
  Popconfirm,
  Radio,
  Popover,
  Select,
  Upload,
  message,
  Spin,
  InputNumber,
} from "antd";
import {
  ControlOutlined,
  EditOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TitleWithIcon from "../../components/admin/TitleWithIcon";
import colors from "../../config/colors";
import { categories } from "../../data/enums";
import MachineService from "../../services/machineService";
import logService from "../../services/logService";
import { useHistory, useParams } from "react-router-dom";
import routes from "../routes";
import ManufucturerService from "../../services/manufucturerService";

const { Title, Text } = Typography;
const { Option } = Select;

const handleFileList = (images) => {
  let fileList = [];

  images.forEach((image, index) => {
    fileList.push({
      uid: `${-1 * (index + 1)}`,
      name: `image${index + 1}.png`,
      status: "done",
      url: image,
    });
  });

  return fileList;
};

function MachineDetail() {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState();
  const [fileList, setfileList] = useState();
  const [loading, setLoading] = useState(false);
  const [manufucturers, setManufucturers] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getData();
    getManufacturers();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await MachineService.getMachine(id);
      if (result) {
        setData(result.data);
        setLoading(false);
        setfileList(handleFileList(result.data.images));
      }
    } catch (ex) {
      logService.log(ex);
    }
  };

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
      const result = await MachineService.saveMachine(values, id);
      if (result) {
        setData(result.data);
        setEdit(false);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await MachineService.deleteMachine(id);
      history.push(routes.ADMIN_MACHINES);
    } catch (ex) {
      logService.log(ex);
    }
  };

  const handleChangeImage = ({ fileList }) => setfileList(fileList);

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
              title: data.title,
              description: data.description,
              images: data.images,
              link: data.link,
              category: data.category,
              manufucturer: data.manufucturer._id,
              minimumQuantity: data.minimumQuantity,
              options: data.options,
            }}
            onFinish={handleSubmit}
          >
            <Row justify="space-between">
              <Title level={3} style={{ marginBottom: 30 }}>
                <Space>
                  <ControlOutlined />
                  {data.title}
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
                  <EditOutlined /> Edit machine
                </Button>
              )}
            </Row>
            <TitleWithIcon
              title="Machine"
              icon={<InfoCircleOutlined />}
              marginTop={0}
            />
            <Descriptions layout="vertical" bordered>
              <Descriptions.Item label="Title">
                {edit ? (
                  <Form.Item
                    name="title"
                    rules={[{ required: true, message: "Please enter title" }]}
                    noStyle
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  data.title
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Manufucturer">
                {edit ? (
                  <Form.Item name="manufucturer" noStyle>
                    <Select style={{ width: "100%" }}>
                      {manufucturers &&
                        manufucturers.map((manufucturer) => (
                          <Option
                            key={manufucturer._id}
                            value={manufucturer._id}
                          >
                            {manufucturer.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                ) : (
                  data.manufucturer.name
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {edit ? (
                  <Form.Item name="category" noStyle>
                    <Select style={{ width: "100%" }}>
                      {categories &&
                        categories.map((category) => (
                          <Option key={category} value={category}>
                            {category}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                ) : (
                  data.category
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Link">
                {edit ? (
                  <Form.Item
                    name="link"
                    rules={[{ required: true, message: "Please enter link" }]}
                    noStyle
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  data.link
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Minimum quantity">
                {edit ? (
                  <Form.Item
                    name="minimumQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please enter minimum quantity",
                      },
                    ]}
                    noStyle
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  data.minimumQuantity
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Description" style={{ maxWidth: 300 }}>
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

              <Descriptions.Item label="Options" span={3}>
                {edit ? (
                  <Form.List name="options">
                    {(fields, { add, remove }) => {
                      return (
                        <div style={{ padding: 30 }}>
                          {fields.map((field, index) => (
                            <div key={field.key} style={{ paddingBottom: 30 }}>
                              <Row
                                style={{ marginBottom: 15 }}
                                align="middle"
                                justify="space-between"
                              >
                                <Text style={{ color: colors.primary }}>
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

                              <Descriptions bordered style={{ marginTop: 20 }}>
                                <Descriptions.Item label="Name">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "name"]}
                                    fieldKey={[field.fieldKey, "name"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter name",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Price">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "price"]}
                                    fieldKey={[field.fieldKey, "price"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter price",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <InputNumber
                                      formatter={(value) =>
                                        `$ ${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ","
                                        )
                                      }
                                      parser={(value) =>
                                        value.replace(/\$\s?|(,*)/g, "")
                                      }
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Weight">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "weight"]}
                                    fieldKey={[field.fieldKey, "weight"]}
                                    noStyle
                                  >
                                    <Input suffix="kg" />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Power">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "power"]}
                                    fieldKey={[field.fieldKey, "power"]}
                                    noStyle
                                  >
                                    <Input suffix="watts" />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Material">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "material"]}
                                    fieldKey={[field.fieldKey, "material"]}
                                    noStyle
                                  >
                                    <Input />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Warranty">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "warranty"]}
                                    fieldKey={[field.fieldKey, "warranty"]}
                                    noStyle
                                  >
                                    <Input suffix="years" />
                                  </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Is this a second hand machine?">
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "isSecondHand"]}
                                    fieldKey={[field.fieldKey, "isSecondHand"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please choose one",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Radio.Group>
                                      <Radio value={true}>Yes</Radio>
                                      <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </Descriptions.Item>
                              </Descriptions>
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
                ) : (
                  data.options &&
                  data.options.map((option) => (
                    <div key={option.name} style={{ padding: 30 }}>
                      <Text style={{ color: colors.primary }}>
                        Option {data.options.indexOf(option) + 1}
                      </Text>

                      <Descriptions bordered style={{ marginTop: 20 }}>
                        <Descriptions.Item label="Name">
                          {option.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Price">
                          {`$ ${option.price}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Weight">
                          {`${option.weight} kg`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Power">
                          {`${option.power} watts`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Material">
                          {option.material}
                        </Descriptions.Item>
                        <Descriptions.Item label="Warranty">
                          {`${option.power} ${
                            option.power <= 1 ? "year" : "years"
                          }`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Second hand">
                          {option.isSecondhand && option.isSecondhand === true
                            ? "Yes"
                            : "No"}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  ))
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Images" span={3}>
                <Row gutter="16">
                  {edit ? (
                    <Form.Item name="images" noStyle>
                      <Upload
                        name="images"
                        action="http://localhost:3900/api/images"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangeImage}
                        onPreview={handlePreview}
                      >
                        {fileList.length >= 20 ? null : (
                          <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  ) : (
                    data.images &&
                    data.images.map((image) => (
                      <Col style={{ marginBottom: 16 }}>
                        <Popover
                          content={
                            <img
                              src={image}
                              alt={data.title}
                              style={{
                                width: 500,
                                height: 300,
                                objectFit: "cover",
                              }}
                            />
                          }
                        >
                          <img
                            key={image}
                            src={image}
                            alt={data.title}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                          />
                        </Popover>
                      </Col>
                    ))
                  )}
                </Row>
              </Descriptions.Item>
            </Descriptions>
            {edit && (
              <Row style={{ marginTop: 20 }} justify="end">
                <Popconfirm
                  title="Are you sure delete this machine?"
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

export default MachineDetail;
