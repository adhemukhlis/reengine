import { getDir, generateFile } from "../../lib/main";
export default (req, res) => {
  const { method, body } = req;
  const generate = generateFile(body);
  const arr = getDir();
  res.status(200).json({ method, body, dir: arr, ...generate });
};
