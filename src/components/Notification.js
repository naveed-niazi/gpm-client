import { notification } from "antd";

export default function sendNotification({ msgType, title, message }) {
  notification[msgType]({
    description: message,
    message: title,
    placement: "bottomLeft",
    duration: 60,
  });
}
