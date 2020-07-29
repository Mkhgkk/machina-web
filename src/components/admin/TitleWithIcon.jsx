import React from "react";
import { Row, Typography, Space } from "antd";
import colors from "../../config/colors";

const { Text } = Typography;

function TitleWithIcon({ icon, title, marginTop = 40 }) {
  return (
    <Row style={{ marginTop, marginBottom: 20 }}>
      <Text style={{ color: colors.primary, fontSize: "1.2em" }}>
        <Space>
          {icon}
          {title}
        </Space>
      </Text>
    </Row>
  );
}

export default TitleWithIcon;
