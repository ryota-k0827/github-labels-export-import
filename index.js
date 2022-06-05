import { Octokit } from "octokit";

const argv = process.argv;
const owner = argv[2];
const exportRepo = argv[3];
const importRepo = argv[4];
const token = argv[6];

const octokit = new Octokit({
  auth: token,
});

const getLabels = async (isExport = true) => {
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
  delLabels.forEach(async (dl, index) => {
    const name = dl.name;
    await octokit.request("DELETE /repos/{owner}/{repo}/labels/{name}", {
      owner,
      repo,
      name,
    });
    console.log(`delete label ${index}/${delLabels.length}`);
  });
};

const postLabel = async (registerLabels = []) => {
  registerLabels.forEach(async (rl, index) => {
    const { name, description, color } = rl;
    await octokit.request("POST /repos/{owner}/{repo}/labels", {
      owner,
      repo: importRepo,
      name,
      description,
      color,
    });
    console.log(`post label ${index}/${registerLabels.length}`);
  });
};

const main = async () => {
  const delLabels = await getLabels(false);
  console.log("get delete labels!!");
  await deleteLabel(delLabels);
  const registerLabels = await getLabels(true);
  console.log("get register labels!!");
  await postLabel(registerLabels);
  console.log("finish!! Ctrl + c");
};

main();
