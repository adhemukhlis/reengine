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
const generateNextConfig = () => {
  const arr = [
    `const nextConfig = {
    publicRuntimeConfig: {
      AppName: '${
        !!project?.project_name
          ? project?.project_name
          : default_project.project_name
      }'
    },
    env: {
      BACKEND_API_HOST: process.env.NEXT_PUBLIC_BACKEND_API_HOST
    },
    eslint: {
      dirs: ['.']
    },
    poweredByHeader: false,
    trailingSlash: true,
    transpilePackages: ['antd'],
    reactStrictMode: false
  }
  
  module.exports = nextConfig`,
  ].join("");
  var options = {
    source: arr,
    mode: "beautify",
    lang: "javascript",
    insize: 1,
    inchar: "\t",
  };
  var pd = prettydiff.api(options);
  fse.outputFileSync(`generated/next.config.js`, pd[0]);
  return { status: "OK", root: rootDirectory };
};

export default generateNextConfig;
