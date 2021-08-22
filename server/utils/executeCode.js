import {exec} from 'child_process'
import fs from 'fs'
import path , {dirname} from "path";
import { fileURLToPath } from 'url';


//ES6 does not support __dirname so to avoid error  __dirname has been generated manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//sellects a folder name "code" which is one level abouve this directry
const outputPath = path.join(__dirname, "../", "output");
//creates the folder "output" if it dosnt exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }



export const executePy = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(
          `python ${filepath} -o ${outPath} && cd ${outputPath}`,
          (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve(stdout);
          }
        );
      });

}  