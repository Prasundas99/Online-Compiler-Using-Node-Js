import fs from "fs";
import path , {dirname} from "path";
import { fileURLToPath } from 'url';
import { v4 as uuid } from "uuid";

//ES6 does not support __dirname so to avoid error  __dirname has been generated manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//sellects a folder name "code" which is one level abouve this directry
const dirCodes = path.join(__dirname, "..", "codes");

console.log(dirCodes);
//creates the folder "code" if it dosnt exist
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateFile = async (format, content) => {
  const jobId = uuid(); //creates a random id to uniquely id the execution
  const filename = `cpp${jobId}.${format}`; //creates a uniquely names file
  const filepath = path.join(dirCodes, filename);

  await fs.writeFileSync(filepath, content);
  return filepath;
};
