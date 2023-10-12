import axios from "axios";

export async function verifyUser(username) {
  const userId = await axios({
    method: "get",
    url: "http://localhost:4000/verifyUser",
    data: {
      username: username,
      // token: sessionId,
    },
  });
  return userId.data;
}
