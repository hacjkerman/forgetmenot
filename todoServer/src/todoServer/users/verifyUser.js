import axios from "axios";
import { logger } from "../logger/logger.js";

export async function verifyUser(username, token) {
  const userId = await axios({
    method: "get",
    url: "http://auth:4000/verifyUser",
    data: {
      username: username,
      token: token,
    },
  });
  if (userId.error) {
    logger.log({
      level: "error",
      message: userId.error,
    });
    return userId.error;
  } else if (userId.status) {
    logger.log({
      level: "info",
      message: userId.data,
    });
    return userId.data;
  } else {
    logger.log({
      level: "error",
      message: "connection could not be established",
    });
    return null;
  }
}
