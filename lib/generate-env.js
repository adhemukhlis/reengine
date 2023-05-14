import fs from "fs";
import fse from "fs-extra";
import path from "path";
import prettydiff from "prettydiff";
import project from "../_re_configs/project";
import default_project from "../_re_configs/project";
const rootDirectory = path.join(process.cwd(), "generated");
export const getDir = () => {
  const fileNames = fs.existsSync(rootDirectory)
    ? fs.readdirSync(rootDirectory)
    : [];
  return fileNames;
};
const generateEnv = () => {
  const arr = [
    `NEXT_PUBLIC_BACKEND_API_HOST=${
      !!project?.env?.NEXT_PUBLIC_BACKEND_API_HOST
        ? project.env.NEXT_PUBLIC_BACKEND_API_HOST
        : ""
    }`,
  ].join("");
  var options = {
    source: arr,
    mode: "beautify",
    lang: "text",
    insize: 1,
    inchar: "\t",
  };
  var pd = prettydiff.api(options);
  fse.outputFileSync(`generated/.env`, pd[0]);
  return { status: "OK", root: rootDirectory };
};

export default generateEnv;
