import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default async function changeEnv(authAddr, todoAddr) {
  await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT}/env?upsert=true`,
    {
      body: JSON.stringify({
        key: "REACT_APP_AUTHSERVER",
        value: authAddr,
        type: "encrypted",
        target: ["preview", "production", "development"],
      }),
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      },
      method: "post",
    }
  );
  const res = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT}/env?upsert=true`,
    {
      body: JSON.stringify({
        key: "REACT_APP_TODOSERVER",
        value: todoAddr,
        type: "encrypted",
        target: ["preview", "production", "development"],
      }),
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      },
      method: "post",
    }
  ).then((res) => res.json());
  console.log(res);
}
