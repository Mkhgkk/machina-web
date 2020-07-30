import React, { Component } from "react";
import { Table, Input, Button, Space, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, ShopOutlined } from "@ant-design/icons";
import colors from "../../config/colors";
import { NavLink } from "react-router-dom";
import routes from "../routes";
import ManufucturerService from "../../services/manufucturerService";
import logService from "../../services/logService";

const { Link, Title } = Typography;

class ManufucturerList extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    loading: false,
    data: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const { data } = await ManufucturerService.getManufucturers();
      this.setState({ data, loading: false });
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
          placeholder={`Search ${dataIndex}`}
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
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
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: colors.secondary, padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address"),
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website",
        ...this.getColumnSearchProps("website"),
        sorter: (a, b) => a.website.length - b.website.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "View",
        key: "view",

        render: (text, record) => (
          <NavLink to={`${routes.ADMIN_MANUFUCTURERS}/${record._id}`}>
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
            <ShopOutlined /> Manufucturers
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

export default ManufucturerList;
