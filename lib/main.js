import fs from "fs";
import fse from "fs-extra";
import path from "path";
import prettydiff from "prettydiff";
import { pascal } from "case";
import { isEmpty } from "lodash";
const rootDirectory = path.join(process.cwd(), "generated");
export const getDir = () => {
  const fileNames = fs.existsSync(rootDirectory)
    ? fs.readdirSync(rootDirectory)
    : [];
  return fileNames;
};
export const generateFile = ({
  name: _name,
  fileType: _fileType,
  prefix: _prefix,
  postfix: _postfix,
}) => {
  const name = isEmpty(_name) ? "un_named" : _name;
  const fileType = isEmpty(_fileType) ? "txt" : _fileType;
  const prefix = isEmpty(_prefix) ? "" : _prefix;
  const postfix = isEmpty(_postfix) ? "" : _postfix;
  const namePascal = pascal(_name);
  const list = Array(200)
    .fill("")
    .map((x, i) => `<li>auto generate component by - [${i}]${name}</li>`)
    .join("");
  const component = `<div>${list}</div>`;
  const arr = [
    `import React from 'react'; const ${namePascal}=()=>{return(`,
    component,
    `)} export default ${namePascal};`,
  ].join("");
  var options = {
    source: arr,
    mode: "beautify",
    lang: "javascript",
    insize: 1,
    inchar: "\t",
  };
  var pd = prettydiff.api(options);
  fse.outputFileSync(
    `generated/${prefix}${namePascal}${postfix}.${fileType}`,
    pd[0]
  );
  return { status: "OK", root: rootDirectory };
};
