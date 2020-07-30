import React, { Component } from "react";
import { Table, Input, Button, Space, Typography } from "antd";
import { SearchOutlined, ControlOutlined } from "@ant-design/icons";
import colors from "../../config/colors";
import { categories } from "../../data/enums";
import { NavLink } from "react-router-dom";
import routes from "../routes";
import MachineSerive from "../../services/machineService";
import logService from "../../services/logService";

const { Link, Title } = Typography;

const factoryArray = (list) => {
  let result = [];

  list.forEach((item) => {
    result.push({ text: item, value: item });
  });

  return result;
};

class MachineList extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    loading: false,
    data: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const result = await MachineSerive.getMachines();
      if (result) this.setState({ data: result.data, loading: false });
    } catch (ex) {
      logService.log(ex);
    }
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={
            Array.isArray(dataIndex)
              ? `Search ${dataIndex[0]}`
              : `Search ${dataIndex}`
          }
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? colors.secondary : undefined }}
      />
    ),
    onFilter: (value, record) =>
      Array.isArray(dataIndex)
        ? record[dataIndex[0]][dataIndex[1]]
          ? record[dataIndex[0]][dataIndex[1]]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : ""
        : record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        ...this.getColumnSearchProps("title"),
        sorter: (a, b) => a.title.length - b.title.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Manufucturer",
        dataIndex: ["manufucturer", "name"],
        key: "manufucturer",
        ...this.getColumnSearchProps(["manufucturer", "name"]),
        sorter: (a, b) =>
          a.manufucturer.name.length - b.manufucturer.name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        filters: factoryArray(categories),
        onFilter: (value, record) => record.category.indexOf(value) === 0,
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Number of options",
        dataIndex: "options",
        key: "options",

        sorter: (a, b) => a.options.length - b.options.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => record.options.length,
      },
      {
        title: "View",
        key: "view",

        render: (text, record) => (
          <NavLink to={`${routes.ADMIN_MACHINES}/${record._id}`}>
            <Link>View</Link>
          </NavLink>
        ),
      },
    ];

    const { data, loading } = this.state;

    return (
      <div style={{ padding: 40 }}>
        <Title level={3} style={{ marginBottom: 30 }}>
          <Space>
            <ControlOutlined /> Machines
          </Space>
        </Title>

        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 8 }}
          loading={loading}
        />
      </div>
    );
  }
}

export default MachineList;
