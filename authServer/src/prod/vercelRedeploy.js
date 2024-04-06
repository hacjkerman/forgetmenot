import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default async function redeploy() {
  const prevDep = await fetch(
    `https://api.vercel.com/v6/deployments?limit=1&projectId=${process.env.VERCEL_PROJECT}&state=READY`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      },
      method: "get",
    }
  ).then((res) => res.json());
  await fetch("https://api.vercel.com/v13/deployments", {
    body: JSON.stringify({
      name: "forgetmenot",
      deploymentId: prevDep.deployments[0].uid,
    }),
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    },
    method: "POST",
  });
}
