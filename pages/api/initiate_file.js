import { getDir } from "../../lib/main";
import generatePackageJson from "../../lib/generate-package-json";
import generateNextConfig from "../../lib/generate-next-config";
import generateEnv from "../../lib/generate-env";
export default (req, res) => {
  const { method, body } = req;
  generateEnv()
  generateNextConfig()
  const generate = generatePackageJson()
  const arr = getDir();
  res.status(200).json({ method, body, dir: arr, ...generate });
};
