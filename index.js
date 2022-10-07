import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const argv = process.argv;
const exportRepoOwner = argv[2];
const exportRepo = argv[3];
const importRepoOwner = argv[4];
const importRepo = argv[5];
const token = process.env.GITHUB_ACCESS_TOKEN;

const octokit = new Octokit({
  auth: token,
});

const getLabels = async (isExport = true) => {
  const owner = isExport ? exportRepoOwner : importRepoOwner;
  const repo = isExport ? exportRepo : importRepo;
  const res = await octokit
    .request("GET /repos/{owner}/{repo}/labels", {
      owner,
      repo,
    })
    .then((res) => res.data);
  return res;
};

const deleteLabel = async (delLabels = []) => {
  delLabels.forEach(async (dl) => {
    const name = dl.name;
    await octokit.request("DELETE /repos/{owner}/{repo}/labels/{name}", {
      owner: importRepoOwner,
      repo: importRepo,
      name,
    });
  });
};

const postLabel = async (registerLabels = []) => {
  registerLabels.forEach(async (rl) => {
    const { name, description, color } = rl;
    await octokit.request("POST /repos/{owner}/{repo}/labels", {
      owner: importRepoOwner,
      repo: importRepo,
      name,
      description,
      color,
    });
  });
};

const main = async () => {
  const delLabels = await getLabels(false); // インポート先の既存ラベルをエクスポート
  await deleteLabel(delLabels); // インポート先の既存ラベルを削除
  const registerLabels = await getLabels(true); // ラベルをエクスポート
  await postLabel(registerLabels); // ラベルをインポート
  console.log(
    `Success!!\nimport labels: https://github.com/${importRepoOwner}/${importRepo}/labels`
  );
};

main();
