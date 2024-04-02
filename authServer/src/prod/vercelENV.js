import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const env = await fetch(
  "https://api.vercel.com/v9/projects/prj_SdEWmHGS9xYPKBVS5NHMgqcAlYUJ/env",
  {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    },
    method: "get",
  }
).then((data) => {
  return data.json();
});
const todo = env.envs.map(
  (variable) => variable.key === "REACT_APP_TODOSERVER"
);
console.log(todo);
await fetch(
  "https://api.vercel.com/v9/projects/prj_SdEWmHGS9xYPKBVS5NHMgqcAlYUJ/env/XMbOEya1gUUO1ir4?teamId=SOME_STRING_VALUE",
  {
    body: {
      comment: "database connection string for production",
      gitBranch: "feature-1",
      key: "GITHUB_APP_ID",
      target: "[preview]",
      type: "plain",
      value: "bkWIjbnxcvo78",
    },
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    },
    method: "patch",
  }
);
