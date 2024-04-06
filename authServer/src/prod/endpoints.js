import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
export default async function endpoints() {
  const ngrok = await fetch("https://api.ngrok.com/tunnels", {
    method: "GET",
    headers: {
      "Ngrok-Version": "2",
      Authorization: `Bearer ${process.env.NGROK_ACCESS_TOKEN}`,
    },
  }).then((res) => {
    return res.json();
  });
  console.log(ngrok);
  const tunnels = ngrok.tunnels;
  console.log(tunnels);
  let endpoints = {};
  for (let i = 0; i < tunnels.length; i++) {
    if (tunnels[i].forwards_to.includes("auth")) {
      endpoints["auth"] = tunnels[i].public_url;
    } else {
      endpoints["todo"] = tunnels[i].public_url;
    }
  }
  return endpoints;
}
