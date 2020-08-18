import { message } from "antd";

function init() { }

function log(error) {
  message.error(error.response.data);
}

export default {
  init,
  log,
};
