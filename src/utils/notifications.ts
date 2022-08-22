import { notification } from "antd";
// import { NotificationApi } from "antd/lib/notification";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = (type: NotificationType, title: string, message: string) => {
  notification[type]({
    message: title,
    description: message
  });
};
