import axios from "axios";

export async function verifyUser(username, token) {
  const userId = await axios({
    method: "get",
    url: "http://auth:4000/verifyUser",
    data: {
      username: username,
      token: token,
    },
  });
  return userId.data;
}
