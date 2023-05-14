import fs from "fs";
import fse from "fs-extra";
import path from "path";
import prettydiff from "prettydiff";
import package_json from "./defaults/default-package-json";
import project from "../_re_configs/project";
const rootDirectory = path.join(process.cwd(), "generated");
export const getDir = () => {
  const fileNames = fs.existsSync(rootDirectory)
    ? fs.readdirSync(rootDirectory)
    : [];
  return fileNames;
};
const generatePackageJson = () => {
  const package_json_adjustment = {
    ...package_json,
    ...(!!project?.project_name && { name: project.project_name }),
  };
  const arr = [JSON.stringify(package_json_adjustment)].join("");
  var options = {
    source: arr,
    mode: "beautify",
    lang: "javascript",
    insize: 1,
    inchar: "\t",
  };
  var pd = prettydiff.api(options);
  fse.outputFileSync(`generated/package.json`, pd[0]);
  return { status: "OK", root: rootDirectory };
};

export default generatePackageJson;
