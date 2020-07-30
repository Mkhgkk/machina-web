import { message } from "antd";

function init() {}

function log(error) {
  message.error(error.response.data);
  // console.error(error);
}

export default {
  init,
  log,
};
